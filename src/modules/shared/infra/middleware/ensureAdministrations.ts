import { ClientRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientRepostory";
import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

const clientRepository = new ClientRepository();
export async function ensureAdministrations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.client;

  const client = await clientRepository.FindById(String(id));

  let clientIsAdmin;

  if (client) {
    Object.keys(client).forEach((key) => {
      if (key !== "admin") {
        return;
      }
      clientIsAdmin = client[key];
    });
  }

  console.log(client);

  if (!clientIsAdmin) {
    throw new AppError("Not Authorization!");
  }
  next();
}
