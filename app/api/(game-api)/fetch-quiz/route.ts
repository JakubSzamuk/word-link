import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function GET(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  let quiz = await prisma.quiz.findFirst({
    where: {
      id: body.id,
    },
  });
  if (quiz == null) {
    return NextResponse.json({ code: 404, data: null });
  }
  let condensedQuiz = {
    id: quiz!.id,
    name: quiz!.name,
    group1: JSON.parse(quiz!.group1!),
    group2: JSON.parse(quiz!.group2!),
    group3: JSON.parse(quiz!.group3!),
    group4: JSON.parse(quiz!.group4!),
  };

  return NextResponse.json({ code: 200, data: condensedQuiz });
}
