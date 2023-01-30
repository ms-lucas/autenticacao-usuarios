import { Request, Response } from "express";
import { UpdateUserService } from "../services/update-user-service";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { name, short_name, email, password, admin, active } = request.body;
    const { id } = request.params;

    const updateUserService = new UpdateUserService();

    const result = await updateUserService.execute(id, {
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
