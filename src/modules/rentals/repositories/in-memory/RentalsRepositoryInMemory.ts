import { ICreateRentalDTO } from "../../infra/dtos/ICreateRentalDTO";
import { Rental } from "../../infra/Entities/Rental";
import { IRentalsRepository } from "../IRantalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findRentalById(id: string): Promise<Rental | null> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental ?? null;
  }
  async create({
    car_id,
    client_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = new Rental();

    Object.assign(newRental, {
      carId: car_id,
      clientId: client_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(newRental);

    return newRental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental | null> {
    return (
      this.rentals.find(
        (rental) => rental.carId == car_id && !rental.end_date
      ) ?? null
    );
  }
  async findOpenRentalByClient(client_id: string): Promise<Rental | null> {
    return (
      this.rentals.find((rental) => {
        return rental.clientId === client_id && !rental.end_date;
      }) ?? null
    );
  }
}
