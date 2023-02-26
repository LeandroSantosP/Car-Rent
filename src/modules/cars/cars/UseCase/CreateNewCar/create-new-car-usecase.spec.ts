import "reflect-metadata";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { CategoryRepositoryInMemory } from "@/modules/cars/categories/infra/repositories/in-memory/category-repository-in-memory";
import { ICarRepository } from "../../infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "../../infra/repositories/in-memory/car-repository-in-memory";
import { CreateNewCarUseCase } from "./CreateNewCarUseCase";
import { ICategoryRepository } from "@/modules/cars/categories/infra/repositories/ICategoryRepository";

let carRepository: ICarRepository;
let categoryRepository: ICategoryRepository;
let createNewCarUseCase: CreateNewCarUseCase;

describe("Created Car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    categoryRepository = new CategoryRepositoryInMemory();
    createNewCarUseCase = new CreateNewCarUseCase(
      carRepository,
      categoryRepository
    );
  });
  it("should be able to create a new car", async () => {
    const newCar = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand",
      license_plate: "ABC-1234",
      fine_amount: 60,
    };
    await createNewCarUseCase.execute(newCar);

    const CreatedCar = await carRepository.GetCarByLicensePlate(
      newCar.license_plate
    );

    expect(CreatedCar).toHaveProperty("license_plate");
  });

  it("should not to be able to create a new car if place already exists!", async () => {
    const newCar = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand",
      license_plate: "ABC-1234",
      fine_amount: 60,
    };
    await createNewCarUseCase.execute(newCar);
    await expect(createNewCarUseCase.execute(newCar)).rejects.toEqual(
      new AppError("Plate Already Cadaster!")
    );
  });

  it("should be able create a new car with available true by default!", async () => {
    const newCar = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand",
      license_plate: "ABC-1234",
      fine_amount: 60,
    };

    await createNewCarUseCase.execute(newCar);

    const allCars = await carRepository.ListAllCars("Brand");

    const carr = allCars.find(
      (car) => car.license_plate === newCar.license_plate
    )?.available;

    expect(carr).toBe(true);
  });

  it("should need throw new AppError if category_id.length to be equal zero", async () => {
    const newCar = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand",
      license_plate: "ABC-1234",
      fine_amount: 60,
      category_id: "",
    };
    await expect(createNewCarUseCase.execute(newCar)).rejects.toEqual(
      new AppError("Invalid Category ID!")
    );
  });

  it("should need throw new AppError license_plate does not exists!", async () => {
    const newCar = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand",
      license_plate: "",
      fine_amount: 60,
      category_id: "",
    };
    await expect(createNewCarUseCase.execute(newCar)).rejects.toEqual(
      new AppError("Invalid Category ID!")
    );
  });
});
