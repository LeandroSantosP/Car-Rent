import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { id: client_id } = req.client;

    const repository = container.resolve(DevolutionRentalUseCase);
    const rental = await repository.execute({ id, client_id });

    return res.status(201).json(rental);
  }
}
