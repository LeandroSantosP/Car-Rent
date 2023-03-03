import { CategoryRepositoryInMemory } from "@/modules/cars/categories/infra/repositories/in-memory/category-repository-in-memory";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { rejects } from "assert";
import "reflect-metadata";
import { CarRepositoryInMemory } from "../../infra/repositories/in-memory/car-repository-in-memory";
import { CategoryOnCarUseCase } from "./CategoryOnCarUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let carRepositoryInMemory: CarRepositoryInMemory;
let categoryOnCarUseCase: CategoryOnCarUseCase;

describe("Category ON Car", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();
    categoryOnCarUseCase = new CategoryOnCarUseCase(carRepositoryInMemory);
  });

  it("should be able to connect a car on category", async () => {
    await carRepositoryInMemory.create({
      name: "test",
      description: "desc test",
      brand: "test",
      daily_rate: 12,
      fine_amount: 50,
      license_plate: "ABC-123",
    });

    const car = await carRepositoryInMemory.GetCarByLicensePlate("ABC-123");

    const { id } = await categoryRepositoryInMemory.create({
      name: "test",
      description: "desc test",
    });

    const carOnCategory = await categoryOnCarUseCase.execute({
      category_id: id!,
      license_plate: car?.license_plate!,
    });

    expect(carOnCategory).toHaveProperty("category_id");
  });

  it("should not to be possible make a link between category and car if car does not exits!", async () => {
    await carRepositoryInMemory.create({
      name: "test",
      description: "desc test",
      brand: "test",
      daily_rate: 12,
      fine_amount: 50,
      license_plate: "ABC-1234",
    });
    const res = await categoryOnCarUseCase.execute({
      license_plate: "ABC-1234",
      category_id: "id_not_existent",
    });

    // await expect().rejects.toEqual(new AppError("Car does not Exits!"));
  });
});
