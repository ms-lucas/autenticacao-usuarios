import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/authenticate-user-service";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const result = await authenticateUserService.execute({ email, password });

    return response.json(result);
  }
}
