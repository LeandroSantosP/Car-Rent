import { CarDTO } from "./dtos/CarDTO";

export interface ICarRepositoryProps {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

export abstract class ICarRepository {
  abstract create({
    daily_rate,
    brand,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICarRepositoryProps): Promise<void>;

  abstract GetCarByLicensePlate(license_plate: string): Promise<CarDTO | null>;

  abstract ListAllCars(): Promise<CarDTO[]>;
}
