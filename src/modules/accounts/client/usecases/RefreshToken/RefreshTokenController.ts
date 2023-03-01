import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } =
      req.body || req.headers["x-access-token"] || req.query.token;

    const repository = container.resolve(RefreshTokenUseCase);

    const refresh_token = await repository.execute(token);

    return res.status(200).json(refresh_token);
  }
}
