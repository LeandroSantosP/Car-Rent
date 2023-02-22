import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateNewCarUseCase } from "./CreateNewCarUseCase";

export class CreateNewCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      daily_rate,
      description,
      license_plate,
      name,
      fine_amount,
      category_id,
    } = req.body;

    const repository = container.resolve(CreateNewCarUseCase);

    await repository.execute({
      brand,
      daily_rate,
      description,
      category_id,
      license_plate,
      name,
      fine_amount,
    });

    return res.status(201).json({
      message: "Registered Car with Success!!",
    });
  }
}
