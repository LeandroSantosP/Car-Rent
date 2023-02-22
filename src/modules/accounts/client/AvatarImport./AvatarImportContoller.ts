import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AvatarImportUseCase } from "./AvatarImportUseCase";

export class AvatarImportController {
  async handle(req: Request, res: Response) {
    const { id } = req.client;
    const avatar_file = req.file?.filename;

    if (!avatar_file) {
      throw new AppError("AvatarUrl Is Required!");
    }

    const repository = container.resolve(AvatarImportUseCase);
    await repository.execute({
      avatarRef: avatar_file,
      client_id: id,
    });

    res.status(201).send();
  }
}
