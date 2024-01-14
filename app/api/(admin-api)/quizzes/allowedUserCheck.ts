import { PrismaClient } from "@prisma/client";

const AllowUser = async (email: string, prismaClient: PrismaClient) => {
  let userObject = await prismaClient.authorizedUser.findFirst({
    where: {
      email: email,
    },
  });

  if (userObject == null) {
    return false;
  } else if (userObject.email == email) {
    return true;
  }
};

export default AllowUser;
