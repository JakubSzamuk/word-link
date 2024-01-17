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
      group1: JSON.stringify(body.groups[0]),
      group2: JSON.stringify(body.groups[1]),
      group3: JSON.stringify(body.groups[2]),
      group4: JSON.stringify(body.groups[3]),

      creator: session?.user?.email,
    },
  });

  return NextResponse.json({ code: 200, data: newQuiz });
}
