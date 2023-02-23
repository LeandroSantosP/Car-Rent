import "reflect-metadata";
import { ICarRepository } from "../../cars/infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "../../cars/infra/repositories/in-memory/car-repository-in-memory";
import { SpecificationRepositoryInMemory } from "../infra/repositories/in-memory/specification-repository-in-memory";
import { ISpecificationRepository } from "../infra/repositories/ISpecificationRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let carRepositoryInMemory: ICarRepository;
let specificationRepository: ISpecificationRepository;

describe("Specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepository = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepository,
      carRepositoryInMemory
    );
  });
  it("should be able to create a new specification", async () => {
    const Specification = {
      name: "Specification test",
      description: "Description test",
      license_plate: "ABC-1234",
    };

    await carRepositoryInMemory.create({
      name: "Car_test",
      brand: "test",
      daily_rate: 12,
      description: "SUV",
      fine_amount: 12,
      license_plate: "ABC-1234",
    });
    const newSpecification = await createSpecificationUseCase.execute(
      Specification
    );

    expect(newSpecification).toHaveProperty("id");
    expect(carRepositoryInMemory).toHaveProperty("cars");
  });
});
