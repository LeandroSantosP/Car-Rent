import { inject, injectable } from "tsyringe";
import { ICarRepository } from "@/modules/cars/cars/infra/repositories/ICarRepository";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { IRentalsRepository } from "../../repositories/IRantalsRepository";
import { Rental } from "../../infra/Entities/Rental";

interface IRequest {
  id: string;
  client_id?: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private readonly rentalRepository: IRentalsRepository,
    @inject("CarRepository")
    private readonly carRepository: ICarRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ client_id, id }: IRequest): Promise<Rental> {
    const minimalDaily = 1;
    const rental = await this.rentalRepository.findRentalById(id);

    if (client_id !== rental?.clientId) {
      throw new AppError("Not Authorization!");
    }

    if (rental && rental?.total) {
      throw new AppError("Rent already waxed!");
    }

    if (!rental) {
      throw new AppError("Invalid Rental!");
    }

    const car = await this.carRepository.GetCarById(rental?.carId!);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date!,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimalDaily;
    }
    let delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expect_return_Date
    );

    let total = 0;
    if (delay > 0) {
      const calculateFine = daily * car?.fine_amount!;

      total = calculateFine;
    }

    total += daily * car?.daily_rate!;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.updateRental({
      total,
      id: rental.id!,
      end_date: rental.end_date,
      expect_return_Date: rental.expect_return_Date,
    });

    if (car?.id) {
      await this.carRepository.ToggleAvailabilityOfCar({
        car_id: car?.id,
        availability: true,
      });
    }

    return rental;
  }
}
