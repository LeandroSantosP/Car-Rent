import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgetPasswordMailUseCase } from "./SendForgetPasswordMailUseCase";

export class SendForgetPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const repository = container.resolve(SendForgetPasswordMailUseCase);

    await repository.execute(email);

    return res.send();
  }
}
