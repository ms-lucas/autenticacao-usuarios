import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { decode } from "jsonwebtoken";
import { prismaClient } from "../lib/prismaClient";
import { TokenPayload } from "../middleware/ensure-authenticate";

type AuthenticateUserRequest = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = {
  user: {
    id: string;
    name: string;
    short_name: string;
    email: string;
    iat: number;
    exp: number;
  };
  token: string;
};

export class AuthenticateUserService {
  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email or password incorrect!");
    }

    if (!user.active) {
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
        short_name: user.short_name,
        email: user.email,
      },
      String(process.env.APP_KEY),
      {
        expiresIn: "1h",
      }
    );

    const decoded = decode(token) as TokenPayload;

    return {
      user: {
        id: decoded.id,
        name: decoded.name,
        short_name: decoded.short_name,
        email: decoded.email,
        iat: decoded.iat,
        exp: decoded.exp,
      },
      token,
    };
  }
}
