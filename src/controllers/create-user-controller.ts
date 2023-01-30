import { Request, Response } from "express";
import { CreateUsersService } from "../services/create-user-service";

export class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, short_name, email, password, admin, active } = request.body;

    const createUsersService = new CreateUsersService();

    const result = await createUsersService.execute({
      name,
      short_name,
      email,
      password,
      admin,
      active,
    });

    return response.status(201).json(result);
  }
}
