import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import AllowUser from "../allowedUserCheck";

const prisma = new PrismaClient();
export const revalidate = 0;

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
