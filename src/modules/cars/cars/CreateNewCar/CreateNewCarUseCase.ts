import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/infra/middleware/AppError";
import { ICarRepository } from "../infra/repositories/ICarRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

@injectable()
export class CreateNewCarUseCase {
  constructor(
    @inject("CarRepository")
    private CarRepository: ICarRepository
  ) {}
  async execute({
    brand,
    daily_rate,
    description,
    license_plate,
    name,
    fine_amount,
  }: IRequest) {
    const CarAlreadyExists = await this.CarRepository.GetCarByLicensePlate(
      license_plate
    );

    if (CarAlreadyExists) {
      throw new AppError("Plate Already Cadaster!");
    }

    await this.CarRepository.create({
      brand,
      daily_rate,
      description,
      license_plate,
      name,
      fine_amount,
    });

    return;
  }
}
