import { Request, Response } from "express";
import { IRequest } from "./CreateNewClientUseCase";
import { container } from "tsyringe";
import { CreateNewClientUseCase } from "./CreateNewClientUseCase";

export class CreateNewClientController {
  async handle(req: Request, res: Response) {
    const { driver_license, email, name, password, avatar } = req.body;

    const repository = container.resolve(CreateNewClientUseCase);
    const result = await repository.execute({
      driver_license,
      email,
      name,
      password,
      avatar,
    });

    res.status(201).json(result);
  }
}
