import { PrismaClient } from "@prisma/client";

const AllowUser = async (email: string, prismaClient: PrismaClient) => {
  let userObject = await prismaClient.authorizedUser.findFirst({
    where: {
      email: email,
    },
  });

  if (userObject == null || userObject.super_admin == false) {
    return false;
  } else {
    return true;
  }
};

export default AllowUser;
