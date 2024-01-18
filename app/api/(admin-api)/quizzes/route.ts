import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import AllowUser from "./allowedUserCheck";

const prisma = new PrismaClient();
export const revalidate = 0;

async function genID(len: number): Promise<string> {
  let id: string = "";
  for (let i = 0; i < len; i++) {
    id += Math.floor(Math.random() * 10);
  }

  const existing = await prisma.quiz.findUnique({
    where: {
      code: id,
    },
  });

  if (existing) {
    return genID(len);
  }

  return id.toString();
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  let user = await AllowUser(session!, prisma);
  if (user == false) return NextResponse.json({ code: 401, data: null });

  if (body.id) {
    let whereCondition = user?.super_admin
      ? {
          id: body.id,
        }
      : {
          id: body.id,
          creator: session?.user?.email,
        };

    let newQuiz = await prisma.quiz.update({
      where: whereCondition,
      data: {
        name: body.name,
        groups: body.groups,

        creator: session?.user?.email,
      },
    });

    return NextResponse.json({ code: 200, data: newQuiz });
  }

  let newQuiz = await prisma.quiz.create({
    data: {
      name: body.name,
      groups: body.groups,

      code: await genID(6),
      creator: session?.user?.email,
    },
  });

  return NextResponse.json({ code: 200, data: newQuiz });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  let user = await AllowUser(session!, prisma);
  if (user == false) return NextResponse.json({ code: 401, data: null });

  let whereCondition = user?.super_admin
    ? {
        id: body.quiz_id,
      }
    : {
        id: body.quiz_id,
        creator: session?.user?.email,
      };

  let quizzes = await prisma.quiz.delete({
    where: whereCondition,
  });

  return NextResponse.json({ code: 200, data: quizzes });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  let user = await AllowUser(session!, prisma);
  if (user == false) return NextResponse.json({ code: 401, data: null });

  let whereCondition = user?.super_admin
    ? {
        code: body.quiz_code,
      }
    : { creator: session?.user?.email, code: body.quiz_code };

  let quizzes = await prisma.quiz.findFirst({
    where: whereCondition,
  });

  return NextResponse.json({ code: 200, data: quizzes });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  let user = await AllowUser(session!, prisma);
  if (user == false) return NextResponse.json({ code: 401, data: null });
  let quizzes;

  if (!user?.super_admin) {
    quizzes = await prisma.quiz.findMany({
      where: {
        creator: session?.user?.email,
      },
    });
  } else if (user?.super_admin) {
    quizzes = await prisma.quiz.findMany();
  }

  return NextResponse.json({ code: 200, data: quizzes });
}
