import { hash } from "bcrypt";
import { prismaClient } from "../lib/prismaClient";

type CreateUsersProps = {
  name: string;
  short_name: string;
  email: string;
  password: string;
  admin?: boolean;
  active?: boolean;
};

export class CreateUsersService {
  async execute({
    name,
    short_name,
    email,
    password,
    admin = false,
    active = true,
  }: CreateUsersProps) {
    if (!name || !short_name || !email || !password) {
      throw new Error("Invalid data!");
    }

    const emailAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email should be unique!");
    }

    const shortNameAlreadyExists = await prismaClient.user.findUnique({
      where: {
        short_name,
      },
    });

    if (shortNameAlreadyExists) {
      throw new Error("Short name shoud be unique!");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        short_name,
        email,
        password: passwordHash,
        admin,
        active,
      },
    });

    return user;
  }
}
