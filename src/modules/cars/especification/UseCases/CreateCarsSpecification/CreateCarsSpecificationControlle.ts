import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarsSpecificationUseCase } from "./CreateCarsSpecificationUseCase";

export class CreateCarsSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const repository = container.resolve(CreateCarsSpecificationUseCase);
    const result = await repository.execute({ carId: id, specifications_id });

    return res.json(result);
  }
}
