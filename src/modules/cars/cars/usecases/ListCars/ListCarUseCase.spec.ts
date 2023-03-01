import "reflect-metadata";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { ICarRepository } from "../../infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "../../infra/repositories/in-memory/car-repository-in-memory";

let carRepositoryInMemory: ICarRepository;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    await carRepositoryInMemory.create({
      name: "Palio",
      description: "Descricao de test",
      brand: "fiat",
      daily_rate: 1020,
      license_plate: "ABC-123",
      fine_amount: 41,
      category_id: "category_id",
    });

    const allCarsAvailable = await listCarsUseCase.execute({});

    expect(allCarsAvailable).toHaveLength(1);
  });

  it("should be possible to list all available cars by name", async () => {
    await carRepositoryInMemory.create({
      name: "Palio",
      description: "Descricao de test",
      brand: "fiat_test",
      daily_rate: 1020,
      license_plate: "ABC-123",
      fine_amount: 41,
      category_id: "category_id",
    });

    const allCarsAvailable = await listCarsUseCase.execute({
      car_name: "Palio",
    });

    expect(allCarsAvailable).toHaveLength(1);
  });

  it("should be possible to list all available cars by brand", async () => {
    await carRepositoryInMemory.create({
      name: "Palio",
      description: "Descricao de test",
      brand: "fiat_test",
      daily_rate: 1020,
      license_plate: "ABC-123",
      fine_amount: 41,
      category_id: "category_id",
    });

    const allCarsAvailable = await listCarsUseCase.execute({
      brand: "fiat_test",
    });

    expect(allCarsAvailable).toHaveLength(1);
  });

  it("should be possible to list all available cars by category_id", async () => {
    await carRepositoryInMemory.create({
      name: "Palio",
      description: "Descricao de test",
      brand: "fiat_test",
      daily_rate: 1020,
      license_plate: "ABC-123",
      fine_amount: 41,
      category_id: "SUV_TEST",
    });

    const allCarsAvailable = await listCarsUseCase.execute({
      category_id: "SUV_TEST",
    });

    expect(allCarsAvailable).toHaveLength(1);
  });
});
