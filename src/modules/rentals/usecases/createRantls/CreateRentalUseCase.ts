import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { Rental } from "../../infra/Entities/Rental";
import { IRentalsRepository } from "../../repositories/IRantalsRepository";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  client_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({
    car_id,
    expected_return_date,
    client_id,
  }: IRequest): Promise<Rental> {
    const minimalHoursToRentedCar = 24;
    const CarUnAvailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (CarUnAvailable) {
      throw new AppError("Car Is UnAvailable!");
    }

    const clientAlreadyRentalOneCar =
      await this.rentalsRepository.findOpenRentalByClient(client_id);

    if (clientAlreadyRentalOneCar) {
      throw new AppError("There a rental in progress for Client!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compere = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compere < minimalHoursToRentedCar) {
      throw new AppError("Is required to be greater than 24 hours.");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      client_id,
    });

    return rental;
  }
}
