import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import AllowUser from "../allowedUserCheck";

const prisma = new PrismaClient();
export const revalidate = 0;

async function genID(len: number): Promise<string> {
  let id: string = "";
  for (let i = 0; i < len; i++) {
    id += Math.floor(Math.random() * 10);
  }

  const existing = await prisma.quiz.findUnique({
    //@ts-expect-error
    where: {
      code: id,
    },
  });

  if (existing) {
    return genID(len);
  }

  return id.toString();
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if ((await AllowUser(session!, prisma)) == false)
    return NextResponse.json({ code: 401, data: null });

  let newQuiz = await prisma.quiz.create({
    data: {
      name: body.name,
      group1: JSON.stringify(body.groups[0]),
      group2: JSON.stringify(body.groups[1]),
      group3: JSON.stringify(body.groups[2]),
      group4: JSON.stringify(body.groups[3]),

      code: await genID(6),
      creator: session?.user?.email,
    },
  });

  return NextResponse.json({ code: 200, data: newQuiz });
}
