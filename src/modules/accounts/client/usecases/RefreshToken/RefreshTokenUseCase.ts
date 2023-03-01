import auth from "@/modules/config/auth";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { IClientTokenRepository } from "../../infra/repositories/IClientTokenRepository";

interface ITokenResponse {
  token: string;
  refresh_token: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("ClientTokenRepository")
    private ClientTokenRepository: IClientTokenRepository,
    @inject("ClientRepository")
    private ClientRepository: IClientRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse | undefined> {
    const decode = verify(token, auth.secretRefreshToken);

    const { sub: client_id } = decode;

    if (typeof client_id === "string") {
      const client_tokens =
        await this.ClientTokenRepository.findByClientIdAndRefreshToken(
          client_id,
          token
        );

      const ClientExists = client_tokens.find(
        (clientToken) => clientToken.refresh_token === token
      );

      if (!ClientExists) {
        throw new AppError("Refresh Token does not Exist!");
      }
      await this.ClientTokenRepository.deleteById(ClientExists.id!);

      const refresh_token = sign({ decode }, auth.secretRefreshToken, {
        subject: client_id!,
        expiresIn: auth.expires_in,
      });

      const expire_date = this.dateProvider.addDays(
        auth.expiresRefreshTokenDays
      );

      await this.ClientTokenRepository.create({
        client_id,
        expire_date,
        refresh_token,
      });

      const newToken = sign({ clientId: client_id }, auth.secretToken, {
        subject: client_id!,
        expiresIn: auth.expiresInToken,
      });

      return {
        token: newToken,
        refresh_token,
      };
    }
  }
}
