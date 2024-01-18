import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const AllowUser = async (
  session: Session | null | undefined,
  prismaClient: PrismaClient
) => {
  if (session == null || session == undefined) return false;

  let userObject = await prismaClient.authorizedUser.findFirst({
    where: {
      email: session.user!.email,
    },
  });

  if (userObject == null || userObject == undefined) {
    return false;
  } else if (
    userObject.email?.toLowerCase() == session.user?.email?.toLowerCase()
  ) {
    return userObject;
  }
};

export default AllowUser;
