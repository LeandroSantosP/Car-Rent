import { CarDTO } from "../dtos/CarDTO";
import { ICarRepository, ICarRepositoryProps } from "../ICarRepository";

export class CarRepository implements ICarRepository {
  create({
    daily_rate,
    brand,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICarRepositoryProps): Promise<void> {
    throw new Error("Method not implemented.");
  }
  GetCarByLicensePlate(license_plate: string): Promise<CarDTO> {
    throw new Error("Method not implemented.");
  }
  ListAllCars(): Promise<CarDTO[]> {
    throw new Error("Method not implemented.");
  }
}
