import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import AllowUser from "../allowedUserCheck";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  if (session?.user?.email == undefined) {
    return NextResponse.json({ status: 401 });
  }

  if (session == null) {
    return NextResponse.json({ code: 401, data: null });
  }
  if ((await AllowUser(session!.user!.email, prisma)) == false) {
    return NextResponse.json({ code: 401, data: null });
  }

  let user = await prisma.authorizedUser.findUnique({
    where: {
      email: session!.user!.email,
    },
  });

  let quizzes;
  if (!user?.super_admin) {
    quizzes = await prisma.quiz.delete({
      where: {
        id: body.quiz_id,
        creator: session?.user?.email,
      },
    });
  } else if (user?.super_admin) {
    quizzes = await prisma.quiz.delete({
      where: {
        id: body.quiz_id,
      },
    });
  }

  return NextResponse.json({ code: 200, data: quizzes });
}
