import "reflect-metadata";
import { ICarRepository } from "../../infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "../../infra/repositories/in-memory/car-repository-in-memory";
import { DeleteCarUseCase } from "./DeleteCarUseCase";

let carRepositoryInMemory: ICarRepository;
let deleteCarUseCase: DeleteCarUseCase;

describe("delete Car", () => {
  beforeAll(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    deleteCarUseCase = new DeleteCarUseCase(carRepositoryInMemory);
  });

  it("should be able to delete a existent!", async () => {
    const newCar = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand",
      license_plate: "ABC-1234",
      fine_amount: 60,
    };
    await carRepositoryInMemory.create(newCar);

    await deleteCarUseCase.execute(newCar.license_plate);

    const allCars = await carRepositoryInMemory.ListAllCars();

    const carYetExits = allCars.find(
      (car) => car.license_plate === newCar.license_plate
    );

    expect(carYetExits).toBeFalsy();
  });
});
