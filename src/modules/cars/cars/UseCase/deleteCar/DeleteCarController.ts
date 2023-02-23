import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCarUseCase } from "./DeleteCarUseCase";

export class DeleteCarController {
  async handle(req: Request, res: Response) {
    const { license_plate } = req.params;

    const repository = container.resolve(DeleteCarUseCase);
    const result = await repository.execute(license_plate);

    res.status(202).json(result);
  }
}
