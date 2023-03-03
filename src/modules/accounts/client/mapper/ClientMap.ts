import { IClientResponseDTO } from "../dtos/IClientResponseDTO";
import { Client } from "../infra/Entity/Client";
import { classToClass } from "class-transformer";

class ClientMap {
  static toDTO({
    email,
    name,
    driver_license,
    avatar,
    created_at,
  }: Client): IClientResponseDTO {
    const client = classToClass({
      email,
      name,
      driver_license,
      avatar,
      created_at,
    });

    return client;
  }
}
export { ClientMap };
