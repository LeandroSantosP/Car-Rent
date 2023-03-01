import { IClientTokenDTO } from "../../dtos/ICreateClientTokenDTO";
import { ClientToken } from "../Entity/ClientToken";

export abstract class IClientTokenRepository {
  abstract create({
    client_id,
    expire_date,
    refresh_token,
  }: IClientTokenDTO): Promise<ClientToken>;

  abstract findByClientIdAndRefreshToken(
    client_id: string,
    refresh_token: string
  ): Promise<ClientToken[]>;

  abstract deleteById(id: string): Promise<void>;
  abstract findByRefreshToken(token: string): Promise<ClientToken | null>;
}
