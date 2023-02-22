import { Car } from "../Entites/Car";
import { CarImage } from "../Entites/CarImage";
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

export interface ICreateImageRequest {
  imageRef: string;
  license_plate: string;
}

export interface CrateImageProps {
  car: {
    license_plate: string;
    name: string;
    available: boolean;
    car_image: CarImage[];
  } | null;
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

  abstract CreateImage({
    license_plate,
    imageRef,
  }: ICreateImageRequest): Promise<CrateImageProps>;

  abstract GetCarByLicensePlate(license_plate: string): Promise<Car | null>;

  abstract ListAllCars(): Promise<Car[]>;
}
