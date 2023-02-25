import { Specification } from "@/modules/cars/especification/infra/Entity/Specification";
import { Car } from "../Entites/Car";
import { CarImage } from "../Entites/CarImage";
import { CarDTO } from "./dtos/CarDTO";

export interface ICarRepositoryProps {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  available?: boolean;
  brand: string;
  category_id?: string;
  Specification_Cars?: Specification[];
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
    Specification_Cars,
  }: ICarRepositoryProps): Promise<void>;

  abstract delete(license_plate: string): Promise<void>;

  abstract CreateImage({
    license_plate,
    imageRef,
  }: ICreateImageRequest): Promise<CrateImageProps>;

  abstract GetCarByLicensePlate(license_plate: string): Promise<Car | null>;

  abstract GetCarById(id: string): Promise<Car | null>;

  abstract CreateManyImage(car_id: string, image: string[]): Promise<void>;

  abstract ListAllCars(
    brand?: string,
    category_id?: string,
    car_name?: string
  ): Promise<Car[]>;
}
