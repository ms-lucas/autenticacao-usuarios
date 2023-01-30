import { prismaClient } from "../lib/prismaClient";

export class ListSpecificUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User does not exists!");
    }

    return user;
  }
}
