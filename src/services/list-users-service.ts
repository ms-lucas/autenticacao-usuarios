import { prismaClient } from "../lib/prismaClient";

export class ListUsersService {
  async execute() {
    const users = await prismaClient.user.findMany();

    return users;
  }
}
