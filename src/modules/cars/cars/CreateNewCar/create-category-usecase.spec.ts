import "reflect-metadata";
import { AppError } from "../../../shared/infra/middleware/AppError";
import { ICarRepository } from "../infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "../infra/repositories/in-memory/car-repository-in-memory";
import { CreateNewCarUseCase } from "./CreateNewCarUseCase";

let carRepository: ICarRepository;
let createNewCarUseCase: CreateNewCarUseCase;

describe("Created Car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    createNewCarUseCase = new CreateNewCarUseCase(carRepository);
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

  it("should not to be able to create a new car if place already exists!", () => {
    expect(async () => {
      const newCar = {
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        brand: "Brand",
        license_plate: "ABC-1234",
        fine_amount: 60,
      };
      await createNewCarUseCase.execute(newCar);
      await createNewCarUseCase.execute(newCar);
    }).rejects.toBeInstanceOf(AppError);
  });
});
