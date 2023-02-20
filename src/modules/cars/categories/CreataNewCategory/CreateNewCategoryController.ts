import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNewCategoryUseCase } from "./CreateNewCategoryUserCase";

export class CreateNewCategoryController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const service = container.resolve(CreateNewCategoryUseCase);

    const result = service.execute({ description, name });

    return res.status(201).json(result);
  }
}
