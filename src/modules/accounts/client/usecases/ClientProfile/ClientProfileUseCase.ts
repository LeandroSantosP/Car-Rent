import { inject, injectable } from "tsyringe";
import { IClientResponseDTO } from "../../dtos/IClientResponseDTO";
import { Client } from "../../infra/Entity/Client";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { ClientMap } from "../../mapper/ClientMap";

@injectable()
export class ClientProfileUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute(client_id: string): Promise<IClientResponseDTO> {
    const client = await this.clientRepository.FindById(client_id);

    const clientForResponse = ClientMap.toDTO(client!);

    return clientForResponse;
  }
}
