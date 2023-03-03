import { Request, Response } from "express";
import { container } from "tsyringe";
import { ClientProfileUseCase } from "./ClientProfileUseCase";

export class ClientProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.client;
    const repository = container.resolve(ClientProfileUseCase);
    const client = await repository.execute(id);

    return res.json(client);
  }
}
