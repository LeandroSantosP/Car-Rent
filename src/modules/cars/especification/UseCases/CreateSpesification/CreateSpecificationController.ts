import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, license_plate } = req.body;

    const repository = container.resolve(CreateSpecificationUseCase);

    const result = await repository.execute({
      description,
      name,
      license_plate,
    });

    return res.status(201).json(result);
  }
}
