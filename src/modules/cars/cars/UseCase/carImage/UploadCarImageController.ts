import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

export class UploadCarImageController {
  async handle(req: Request, res: Response) {
    const { license_plate } = req.params;

    const carImage_file = req.file?.filename;

    const repository = container.resolve(UploadCarImageUseCase);
    const result = await repository.execute({
      imageRef: carImage_file,
      license_plate,
    });

    return res.status(201).json(result);
  }
}
