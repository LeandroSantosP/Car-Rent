import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;

    const { password } = req.body;
    const repository = container.resolve(ResetPasswordUseCase);

    await repository.execute({
      token: token as string,
      password,
    });

    return res.send();
  }
}
