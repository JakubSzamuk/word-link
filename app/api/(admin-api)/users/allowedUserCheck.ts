import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const AllowUser = async (
  session: Session | null | undefined,
  prismaClient: PrismaClient
) => {
  if (session == null || session == undefined) return false;

  let userObject = await prismaClient.authorizedUser.findFirst({
    where: {
      email: session.user?.email,
    },
  });

  if (
    userObject == null ||
    userObject.super_admin == false ||
    userObject.email != session.user?.email
  ) {
    return false;
  } else {
    return true;
  }
};

export default AllowUser;
