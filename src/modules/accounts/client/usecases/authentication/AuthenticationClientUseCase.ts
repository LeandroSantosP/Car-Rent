import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import auth from "@/modules/config/auth";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { IClientTokenRepository } from "../../infra/repositories/IClientTokenRepository";

interface IRequest {
  password: string;
  email: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticationClientUseCase {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: IClientRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,

    @inject("ClientTokenRepository")
    private clientTokenRepository: IClientTokenRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
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

    const {
      expiresInToken,
      secretRefreshToken,
      secretToken,
      expires_in,
      expiresRefreshTokenDays,
    } = auth;

    const token = sign({ clientId: client.id }, secretToken, {
      expiresIn: expiresInToken,
      subject: client.id!,
    });

    const refresh_token = sign({ email: client.email }, secretRefreshToken, {
      subject: client.id!,
      expiresIn: expires_in,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.clientTokenRepository.create({
      client_id: client.id!,
      refresh_token,
      expire_date: refresh_token_expires_date,
    });

    const returnToken: IResponse = {
      user: {
        name: client.name,
        email: client.email,
      },
      token,
      refresh_token,
    };

    return returnToken;
  }
}
