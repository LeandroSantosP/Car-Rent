import { Car } from "../../Entites/Car";
import { CarDTO } from "../dtos/CarDTO";
import { ICarRepository, ICarRepositoryProps } from "../ICarRepository";

export class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];

  async ListAllCars(): Promise<Car[]> {
    return this.cars;
  }
  async create({
    daily_rate,
    brand,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICarRepositoryProps): Promise<void> {
    const newCar = new Car();
    Object.assign(newCar, {
      name,
      daily_rate,
      brand,
      description,
      fine_amount,
      license_plate,
    });

    this.cars.push(newCar);
    return;
  }

  async GetCarByLicensePlate(license_plate: string): Promise<Car | null> {
    const carByLicensePlate = this.cars.find(
      (car) => car.license_plate == license_plate
    );

    if (!carByLicensePlate) {
      return null;
    }

    return carByLicensePlate;
  }
}
