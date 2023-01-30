import { hash } from "bcrypt";
import { prismaClient } from "../lib/prismaClient";

type UpdateUserRquest = {
  name: string;
  short_name: string;
  email: string;
  password: string;
  admin?: boolean;
  active?: boolean;
};

type UpdateUserResponse = Omit<UpdateUserRquest, "password">;

export class UpdateUserService {
  async execute(
    id: string,
    {
      name,
      short_name,
      email,
      password,
      admin = false,
      active = true,
    }: UpdateUserRquest
  ): Promise<UpdateUserResponse> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User does not exists!");
    }

    if (email) {
      const emailAlreadyExists = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (emailAlreadyExists) {
        throw new Error("Email should be unique!");
      }
    }

    if (short_name) {
      const shortNameAlreadyExists = await prismaClient.user.findUnique({
        where: {
          short_name,
        },
      });

      if (shortNameAlreadyExists) {
        throw new Error("Short name shoud be unique!");
      }
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: name,
        short_name: short_name,
        email: email || user.email,
        password: password ? await hash(password, 8) : undefined,
        admin: admin,
        active: active,
        updated_at: new Date(),
      },
    });

    const { password: newPassrod, ...newUser } = updatedUser;

    return newUser;
  }
}
