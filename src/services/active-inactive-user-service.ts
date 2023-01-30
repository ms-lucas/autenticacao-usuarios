import { prismaClient } from "../lib/prismaClient";

export class ActiveInactiveUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User does not exists!");
    }

    const newUser = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        active: !user?.active,
      },
    });

    return newUser;
  }
}
