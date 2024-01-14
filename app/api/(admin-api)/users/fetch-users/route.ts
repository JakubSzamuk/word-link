import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function GET(req: NextRequest, res: NextResponse) {
  // const body = await req.json();

  const session = await getServerSession(authOptions);

  let users = await prisma.authorizedUser.findMany();

  return NextResponse.json({ code: 200, data: users });
}