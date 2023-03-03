import { Car } from "../../Entites/Car";
import { CarImage } from "../../Entites/CarImage";

import {
  CrateImageProps,
  ICarRepository,
  ICarRepositoryProps,
  ICreateImageRequest,
  ToggleAvailabilityOfCarProps,
} from "../ICarRepository";

export class CarRepositoryInMemory implements ICarRepository {
  public cars: Car[] = [];
  public carsImage: CarImage[] = [];

  async ToggleAvailabilityOfCar(
    dados: ToggleAvailabilityOfCarProps
  ): Promise<Car> {
    const index = this.cars.findIndex((car) => car.id === dados.car_id);
    if (index !== -1) {
      this.cars[index].available = dados.availability;
    }

    return this.cars[index];
  }
  async GetCarById(id: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      return null;
    }
    return car;
  }

  CreateManyImage(car_id: string, image: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async ListAllCars(
    brand?: string,
    category_id?: string,
    car_name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (!car.available) {
        return;
      }
      if (
        (brand && car.brand !== brand) ||
        (car_name && car.name !== car_name) ||
        (category_id && car.category_id !== category_id)
      ) {
        return;
      }

      return car;
    });

    return cars;
  }

  async delete(license_plate: string): Promise<void> {
    const restOfCars = this.cars.filter(
      (car) => car.license_plate !== license_plate
    );

    this.cars = restOfCars;
    return;
  }
  async CreateImage({
    license_plate,
    imageRef,
  }: ICreateImageRequest): Promise<CrateImageProps> {
    throw new Error("Method not implemented.");
  }

  async create({
    daily_rate,
    brand,
    description,
    fine_amount,
    license_plate,
    category_id,
    name,
    Specification_Cars,
  }: ICarRepositoryProps): Promise<void> {
    const newCar = new Car();
    Object.assign(newCar, {
      name,
      daily_rate,
      brand,
      description,
      fine_amount,
      license_plate,
      category_id,
      Specification_Cars,
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

  async LinkCarOnCategory(
    license_plate: string,
    category_id: string
  ): Promise<Car> {
    const index = this.cars.findIndex(
      (car) => car.license_plate === license_plate
    );

    if (index !== -1) {
      this.cars[index].category_id = category_id;
    }
    console.log(category_id);

    return this.cars[index];
  }
}
