import { IClientTokenDTO } from "../../../dtos/ICreateClientTokenDTO";
import { prisma } from "@/modules/shared/prisma/client";

import { ClientToken } from "../../Entity/ClientToken";
import { IClientTokenRepository } from "../IClientTokenRepository";

export class ClientTokenRepository implements IClientTokenRepository {
  private prisma;
  constructor() {
    this.prisma = prisma;
  }

  async create({
    client_id,
    expire_date,
    refresh_token,
  }: IClientTokenDTO): Promise<ClientToken> {
    const newToken = await this.prisma.clientToken.create({
      data: {
        clientId: client_id,
        expire_date,
        refresh_token,
      },
    });

    return newToken;
  }

  async findByClientIdAndRefreshToken(
    client_id: string,
    refresh_token: string
  ): Promise<ClientToken[]> {
    const clientToken = await this.prisma.clientToken.findMany({
      where: {
        clientId: client_id,
        refresh_token,
      },
    });

    return clientToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.clientToken.delete({
      where: {
        id,
      },
    });
    return;
  }
  async findByRefreshToken(token: string): Promise<ClientToken | null> {
    const clientToken = await this.prisma.clientToken.findFirst({
      where: {
        refresh_token: token,
      },
    });

    return clientToken;
  }
}
