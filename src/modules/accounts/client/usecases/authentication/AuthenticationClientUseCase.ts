import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { Client } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { ClientDTO } from "../../infra/repositories/dtos/ClientDTO";
import { IClientRepository } from "../../infra/repositories/IClientRepository";

interface IRequest {
  password: string;
  email: string;
}

@injectable()
export class AuthenticationClientUseCase {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: IClientRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const client = await this.ClientRepository.FindByEmail(email);
    let userPass = "";
    if (client) {
      Object.keys(client).forEach((key) => {
        if (key !== "password") {
          return;
        }
        userPass = client[key];
      });
    }

    if (!client) {
      throw new AppError("Email or Password Incorrect!!", 401);
    }

    const passwordMatch = await compare(password, userPass);

    if (!passwordMatch) {
      throw new AppError("Email or Password Incorrect!!", 401);
    }

    const token = sign(
      { clientId: client.id },
      "c9102901f17290a4185ef62434fd9881",
      {
        expiresIn: "1d",
      }
    );

    return {
      user: {
        name: client.name,
        email: client.email,
      },
      token,
    };
  }
}
