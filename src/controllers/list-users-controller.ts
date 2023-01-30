import { Request, Response } from "express";
import { ListUsersService } from "../services/list-users-service";
export class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const result = await listUsersService.execute();

    return response.status(200).json(result);
  }
}
