import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../infra/repositories/IClientRepository";

@injectable()
export class GetClientInfosUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}
  async execute(client_id: string) {
    const clientInfos = await this.clientRepository.FindById(client_id);

    return clientInfos;
  }
}
