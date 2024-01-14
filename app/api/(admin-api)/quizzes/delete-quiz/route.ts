import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function GET(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  if (session?.user?.email == undefined) {
    return NextResponse.json({ status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session!.user!.email,
    },
  });

  let quizzes;
  if (!user?.super_admin) {
    quizzes = await prisma.quiz.delete({
      where: {
        id: body.id,
        creator: session?.user?.email,
      },
    });
  } else {
    quizzes = await prisma.quiz.delete({
      where: {
        id: body.id,
      },
    });
  }

  return NextResponse.json({ code: 200, data: quizzes });
}
