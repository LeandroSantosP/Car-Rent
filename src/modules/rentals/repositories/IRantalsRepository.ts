import { ICreateRentalDTO } from "../infra/dtos/ICreateRentalDTO";
import { Rental } from "../infra/Entities/Rental";

export abstract class IRentalsRepository {
  abstract findOpenRentalByCarId(card_id: string): Promise<Rental | null>;
  abstract findOpenRentalByClient(client_id: string): Promise<Rental | null>;
  abstract create(data: ICreateRentalDTO): Promise<Rental>;
}
