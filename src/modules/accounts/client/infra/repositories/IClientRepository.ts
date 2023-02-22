import { Client } from "../Entity/Client";

export interface ICreateRequest {
  email: string;
  name: string;
  password: string;
  driver_license: string;
  avatar?: string | null;
}

export abstract class IClientRepository {
  abstract create({
    avatar,
    email,
    name,
    password,
  }: ICreateRequest): Promise<Client>;

  abstract FindById(client_id: string): Promise<Client | null>;

  abstract FindByEmail(email: string): Promise<Client | null>;
  abstract ListAllClientsADM(): Promise<Client[]>;

  abstract GetClientByLicenseDriver(
    driver_license: string
  ): Promise<Client | null>;
}
