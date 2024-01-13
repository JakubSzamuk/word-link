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

  return NextResponse.json(JSON.stringify({ data: "H" }));
  // if (session?.user) {
  // const userId = (await prisma.user.findFirst({
  //   where: {
  //     email: session?.user?.email,
  //   },
  // }))!.id;
  // const accountData = await prisma.user.findFirst({
  //   where: {
  //     id: userId,
  //   },
  // });
  // const allDocuments = await prisma.savedDocuments.findMany({
  //   where: {
  //     uid: userId,
  //   },
  // });
  // return NextResponse.json({ account: accountData, docs: allDocuments });
  // }
}
