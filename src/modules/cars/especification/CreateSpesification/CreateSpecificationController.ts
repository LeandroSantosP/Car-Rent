import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const repository = container.resolve(CreateSpecificationUseCase);

    const result = await repository.execute({ description, name });

    return res.status(201).json(result);
  }
}
