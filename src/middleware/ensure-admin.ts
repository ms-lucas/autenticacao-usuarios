import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../lib/prismaClient";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user } = request;

  const userInfo = await prismaClient.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userInfo?.admin) {
    return response.status(401).json({
      status: "Unauthorized",
      message: "permission refused"
    })
  }

  next();
}
