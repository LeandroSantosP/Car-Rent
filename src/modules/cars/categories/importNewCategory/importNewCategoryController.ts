import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { importNewCategoryUseCase } from "./importNewCategoryUseCase";

export class ImportNewCategoryController {
  async handle(req: Request, res: Response) {
    const { file } = req;

    const repository = container.resolve(importNewCategoryUseCase);
    if (file) {
      await repository.execute(file);
      res.status(201).send();
    } else {
      throw new AppError("Invalid data");
    }
  }
}
