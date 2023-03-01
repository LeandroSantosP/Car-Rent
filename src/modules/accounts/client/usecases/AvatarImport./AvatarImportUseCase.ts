import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { IStorageProvider } from "@/modules/shared/provider/StorageProvider/IStorageProvider";

import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../infra/repositories/IClientRepository";

interface IRequest {
  client_id: string;
  avatarRef: string;
}

@injectable()
export class AvatarImportUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatarRef, client_id }: IRequest) {
    await this.storageProvider.save(avatarRef, "avatar");

    const client = await this.clientRepository.FindById(client_id);

    if (client?.avatar) {
      /* for same reason it is not delete! i don't know why */
      /*  chatGtp makes worker O_O */
      await this.storageProvider.delete(client.avatar, "avatar");
    }

    if (!client) {
      throw new AppError("Not Authorization");
    }

    return await this.clientRepository.UploadAvatar({
      avatarRef,
      client_id: client.id,
    });
  }
}
