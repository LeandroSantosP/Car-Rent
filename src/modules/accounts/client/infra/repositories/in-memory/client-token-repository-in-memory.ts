import { IClientTokenDTO } from "../../../dtos/ICreateClientTokenDTO";
import { ClientToken } from "../../Entity/ClientToken";
import { IClientTokenRepository } from "../IClientTokenRepository";

export class ClientTokenRepositoryInMemory implements IClientTokenRepository {
  ClientTokes: ClientToken[] = [];
  async create({
    client_id,
    expire_date,
    refresh_token,
  }: IClientTokenDTO): Promise<ClientToken> {
    const newClient = new ClientToken();

    Object.assign(newClient, {
      refresh_token,
      clientId: client_id,
      expire_date,
    });

    this.ClientTokes.push(newClient);

    return newClient;
  }

  async findByClientIdAndRefreshToken(
    client_id: string,
    refresh_token: string
  ): Promise<ClientToken[]> {
    const ClientToken = this.ClientTokes.filter((clientToken) => {
      return (
        clientToken.clientId === client_id &&
        clientToken.refresh_token === refresh_token
      );
    });
    return ClientToken;
  }

  async deleteById(id: string): Promise<void> {
    const clientToken = this.ClientTokes.find((ut) => ut.id === id);
    const index = this.ClientTokes.indexOf(clientToken!);

    if (index !== -1) {
      this.ClientTokes.slice(index, 1);
    }

    return;
  }

  async findByRefreshToken(refreshToken: string): Promise<ClientToken | null> {
    const clientToken = this.ClientTokes.find(
      (clientToken) => clientToken.refresh_token === refreshToken
    );
    return clientToken ?? null;
  }
}
