import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IResponse {
  message: string;
}

@injectable()
export class DeleteCarUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute(license_plate: string): Promise<IResponse> {
    const carExists = await this.carRepository.GetCarByLicensePlate(
      license_plate
    );

    if (!carExists) {
      throw new AppError("Car Does not Exits!");
    }

    await this.carRepository.delete(license_plate);

    return {
      message: `Car ${carExists.name} Was Deleted with success!`,
    };
  }
}
