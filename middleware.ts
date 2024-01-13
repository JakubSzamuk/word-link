import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  const session = useSession();

  let user = await prisma.user.findFirst({
    where: {
      email: session.data?.user?.email,
    },
  });

  // session.data?.user?.email
}

export const config = {
  matcher: "/api/:path*",
};
