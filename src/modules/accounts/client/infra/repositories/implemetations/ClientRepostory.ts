import { prisma } from "@/modules/shared/prisma/client";
import { Client } from "../../Entity/Client";
import { IClientRepository, ICreateRequest } from "../IClientRepository";

export class ClientRepository implements IClientRepository {
  private prisma;
  constructor() {
    this.prisma = prisma;
  }
  async FindById(client_id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: {
        id: client_id,
      },
    });

    return client;
  }

  async create({
    avatar,
    email,
    name,
    password,
    driver_license,
  }: ICreateRequest): Promise<Client> {
    const newClient = await this.prisma.client.create({
      data: {
        avatar: avatar,
        email: email,
        name: name,
        password: password,
        driver_license: driver_license,
      },
    });

    return newClient;
  }
  async FindByEmail(email: string): Promise<Client | null> {
    const client = this.prisma.client.findUnique({
      where: {
        email,
      },
    });
    if (!client) {
      return null;
    }

    return client;
  }
  async ListAllClientsADM(): Promise<Client[]> {
    const allClient = await this.prisma.client.findMany();
    return allClient;
  }
  async GetClientByLicenseDriver(
    driver_license: string
  ): Promise<Client | null> {
    const client = this.prisma.client.findFirst({
      where: {
        driver_license,
      },
    });

    return client;
  }
}