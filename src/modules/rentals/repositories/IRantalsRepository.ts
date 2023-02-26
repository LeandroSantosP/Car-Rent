import { ICreateRentalDTO } from "../infra/dtos/ICreateRentalDTO";
import { Rental } from "../infra/Entities/Rental";

export interface UpdateRentalProps {
  id: string;
  total: number;
  end_date: Date;
  expect_return_Date: Date;
}

export abstract class IRentalsRepository {
  abstract findOpenRentalByCarId(card_id: string): Promise<Rental | null>;
  abstract findOpenRentalByClient(client_id: string): Promise<Rental | null>;
  abstract create(data: ICreateRentalDTO): Promise<Rental>;
  abstract findRentalById(id: string): Promise<Rental | null>;
  abstract updateRental({
    id,
    end_date,
    expect_return_Date,
  }: UpdateRentalProps): Promise<Rental>;
}
