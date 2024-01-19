import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/AuthOptions";
import AllowUser from "./allowedUserCheck";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if ((await AllowUser(session!, prisma)) == false)
    return NextResponse.json({ code: 401, data: null });

  let user;
  if (body.id != undefined) {
    user = await prisma.authorizedUser.update({
      where: {
        id: body.id,
      },
      data: {
        email: body.email,
        super_admin: body.superUser,
      },
    });
  } else {
    user = await prisma.authorizedUser.create({
      data: {
        email: body.email,
        super_admin: body.superUser,
      },
    });
  }
  return NextResponse.json({ code: 200, data: user });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const session = await getServerSession(authOptions);

  if ((await AllowUser(session!, prisma)) == false)
    return NextResponse.json({ code: 401, data: null });

  try {
    let deletedUser = await prisma.authorizedUser.delete({
      where: {
        id: searchParams.get("user_id")!,
      },
    });
    return NextResponse.json({ code: 200 });
  } catch {
    return NextResponse.json({ code: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if ((await AllowUser(session!, prisma)) == false)
    return NextResponse.json({ code: 401, data: null });

  let users = await prisma.authorizedUser.findMany();

  return NextResponse.json({ code: 200, data: users || "Unauthorized" });
}
