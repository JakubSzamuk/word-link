import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  let quiz = await prisma.quiz.findFirst({
    where: {
      code: body.quiz_code,
    },
  });
  if (quiz == null) {
    return NextResponse.json({ code: 404, data: null });
  }
  let condensedQuiz = {
    id: quiz!.id,
    name: quiz!.name,
    groups: quiz!.groups,
  };

  return NextResponse.json({ code: 200, data: condensedQuiz });
}
