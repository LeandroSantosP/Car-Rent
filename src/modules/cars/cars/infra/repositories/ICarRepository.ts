import { Car } from "../Entites/Car";
import { CarDTO } from "./dtos/CarDTO";

export interface ICarRepositoryProps {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id?: string;
}

export abstract class ICarRepository {
  abstract create({
    daily_rate,
    brand,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
  }: ICarRepositoryProps): Promise<void>;

  abstract GetCarByLicensePlate(license_plate: string): Promise<Car | null>;

  abstract ListAllCars(): Promise<CarDTO[]>;
}
