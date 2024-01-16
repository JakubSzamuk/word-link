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
