import { ActiveInactiveUserService } from "../services/active-inactive-user-service";
import { Request, Response } from "express";

export class ActiveInactiveUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const activeInactiveUserService = new ActiveInactiveUserService();

    const result = await activeInactiveUserService.execute(id);

    return response.status(200).json(result);
  }
}
