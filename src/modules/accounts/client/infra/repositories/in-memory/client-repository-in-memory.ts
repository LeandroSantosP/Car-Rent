import { Client } from "../../Entity/Client";
import {
  IClientRepository,
  ICreateRequest,
  IUpdatedPasswordRequest,
  IUploadAvatarRequest,
} from "../IClientRepository";

export class ClientRepositoryInMemory implements IClientRepository {
  Clients: Client[] = [];
  async FindById(client_id: string): Promise<Client | null> {
    const client = this.Clients.find((info) => info.id === client_id);

    if (!client) {
      return null;
    }
    return client;
  }

  async UploadAvatar({
    avatarRef,
    client_id,
  }: IUploadAvatarRequest): Promise<void> {
    const index = this.Clients.findIndex((client) => client.id === client_id);

    if (index !== -1) {
      this.Clients[index].avatar = avatarRef;
    }
    return;
  }
  async GetClientByLicenseDriver(
    driver_license: string
  ): Promise<Client | null> {
    const client = this.Clients.find(
      (client) => client.driver_license == driver_license
    );

    if (!client) {
      return null;
    }

    return client;
  }

  async create({
    avatar,
    email,
    name,
    password,
    driver_license,
  }: ICreateRequest): Promise<Client> {
    const newClient = new Client();

    Object.assign(newClient, {
      avatar,
      email,
      name,
      password,
      driver_license,
    });

    this.Clients.push(newClient);

    return newClient;
  }
  async FindByEmail(email: string): Promise<Client | null> {
    const client = this.Clients.find((client) => client.email === email);

    if (!client) {
      return null;
    }

    return client;
  }
  async ListAllClientsADM(): Promise<Client[]> {
    return this.Clients;
  }

  async updatedPassword({
    client_id,
    newPassword,
  }: IUpdatedPasswordRequest): Promise<Client> {
    const index = this.Clients.findIndex((client) => client.id === client_id);

    this.Clients[index].password = newPassword;

    return this.Clients[index];
  }
}
