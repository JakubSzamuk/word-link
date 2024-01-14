import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export async function middleware(req: NextRequest, res: NextResponse) {
  // const session = await getSession({ req });
  // const session = await getServerSession(authOptions);

  // console.log(JSON.stringify(authOptions));
  // // let user = await prisma.authorizeduser.findFirst({
  // //   where: {
  // //     email: session!.user?.email,
  // //   },
  // // });
  // // console.log(user);
  // // session.data?.user?.email
  // return NextResponse.json(session);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/users/:path*",
};
