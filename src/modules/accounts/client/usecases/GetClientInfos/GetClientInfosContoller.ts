import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetClientInfosUseCase } from "./GetClientInfosUseCase";

export class GetClientInfosController {
  async handle(req: Request, res: Response) {
    const { id } = req.client;
    const repository = container.resolve(GetClientInfosUseCase);
    const client = await repository.execute(id);

    return res.status(200).json(client);
  }
}
