import { Request, Response } from "express";
import { container } from "tsyringe";
import { CategoryOnCarUseCase } from "./CategoryOnCarUseCase";

export class CategoryOnCarController {
  async handle(req: Request, res: Response) {
    const { category_id, license_plate } = req.body;
    const category = container.resolve(CategoryOnCarUseCase);
    const result = await category.execute({ category_id, license_plate });

    return res.status(201).json(result);
  }
}
