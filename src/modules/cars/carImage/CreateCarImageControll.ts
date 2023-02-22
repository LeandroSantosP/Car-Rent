import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarImageUseCase } from "./CreateCarImageUseCase";

export class CreateCarImageController {
  async handle(req: Request, res: Response) {
    const { imageRef, license_plate } = req.body;

    const repository = container.resolve(CreateCarImageUseCase);
    const result = await repository.execute({ imageRef, license_plate });

    return res.status(201).json(result);
  }
}
