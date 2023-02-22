import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationClientUseCase } from "./AuthenticationClientUseCase";

export class AuthenticationClientController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const repository = container.resolve(AuthenticationClientUseCase);
    const result = await repository.execute({ email, password });

    return res.status(201).json(result);
  }
}
