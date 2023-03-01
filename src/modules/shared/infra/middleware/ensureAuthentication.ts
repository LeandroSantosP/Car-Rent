import { ClientRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientRepostory";
import { ClientTokenRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientTokenRepository";
import auth from "@/modules/config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "./AppError";

interface IJWPayload {
  sub: string;
}

export async function EnsureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Token MISSING!!");
  }

  const Token = authorization.split(" ")[1];

  try {
    const { sub: client_id } = verify(Token, auth.secretToken) as IJWPayload;


    req.client = {
      id: client_id!,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid Token", 401);
  }
}
