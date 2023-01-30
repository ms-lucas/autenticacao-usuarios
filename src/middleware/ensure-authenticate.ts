import { Request, Response, NextFunction } from "express";
import { decode, JwtPayload, verify } from "jsonwebtoken";

export type TokenPayload = {
  id: string;
  name: string;
  short_name: string;
  email: string;
  iat: number;
  exp: number;
};

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.json(401).json({
      status: "Unauthorized",
      message: "Token is missing!",
    });
  }

  const [, token] = authorization.split(" ");

  verify(token, String(process.env.APP_KEY));

  const decoded = decode(token);

  const { id, name, short_name, email } = decoded as TokenPayload;

  request.user = {
    id,
    name,
    short_name,
    email,
  };

  next();
}
