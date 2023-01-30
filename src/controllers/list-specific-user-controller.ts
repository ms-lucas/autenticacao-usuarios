import { Request, Response } from "express";
import { ListSpecificUserService } from "../services/list-specific-user-service";

export class ListSpecificUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listSpecificUserService = new ListSpecificUserService();

    const result = await listSpecificUserService.execute(id);

    return response.status(200).json(result);
  }
}
