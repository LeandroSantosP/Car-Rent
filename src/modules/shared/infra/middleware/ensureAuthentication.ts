import { ClientRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientRepostory";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "./AppError";

interface IJWPayload {
  clientId: string;
}

const clientRepository = new ClientRepository();
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
    const { clientId } = verify(
      Token,
      "c9102901f17290a4185ef62434fd9881"
    ) as IJWPayload;

    const client = await clientRepository.FindById(clientId);

    if (!client) {
      throw new AppError("Not Authorization!");
    }

    req.client = {
      id: client.id!,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid Token", 401);
  }
}
