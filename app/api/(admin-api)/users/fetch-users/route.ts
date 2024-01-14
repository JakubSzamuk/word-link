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

  if (session == null) {
    return NextResponse.json({ code: 401, data: null });
  }
  if ((await AllowUser(session!.user!.email, prisma)) == false) {
    return NextResponse.json({ code: 401, data: null });
  }

  let users = await prisma.authorizedUser.findMany();

  return NextResponse.json({ code: 200, data: users || "unauthorized" });
}
