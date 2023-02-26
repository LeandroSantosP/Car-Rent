import { AppError } from "@/modules/shared/infra/middleware/AppError";
import "reflect-metadata";
import { exec } from "child_process";
import { ICarRepository } from "../../../cars/infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "../../../cars/infra/repositories/in-memory/car-repository-in-memory";
import { SpecificationRepositoryInMemory } from "../../infra/repositories/in-memory/specification-repository-in-memory";
import { ISpecificationRepository } from "../../infra/repositories/ISpecificationRepository";
import { CreateCarsSpecificationUseCase } from "./CreateCarsSpecificationUseCase";

let carRepository: ICarRepository;
let specificationRepository: ISpecificationRepository;
let createCarsSpecificationUseCase: CreateCarsSpecificationUseCase;

describe("CreateCarsSpecification", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    specificationRepository = new SpecificationRepositoryInMemory();
    createCarsSpecificationUseCase = new CreateCarsSpecificationUseCase(
      carRepository,
      specificationRepository
    );
  });

  it("should not add new Specification if license_plate of car not exits!", async () => {
    const carId = "sadsa";
    const specifications_id = ["67832"];
    await expect(
      createCarsSpecificationUseCase.execute({
        carId,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not Exits!"));
  });

  it("should add new Specification on the car", async () => {
    // const newSpecificationProps = {
    //   id: "spec_id",
    //   name: "Specification test",
    //   license_plate: "123-ABC",
    //   description: "one random description",
    // };
    // (await specificationRepository.create(newSpecificationProps)) as any;
    // const newCar = {
    //   name: "Name Car",
    //   description: "Description Car",
    //   daily_rate: 100,
    //   brand: "Brand",
    //   license_plate: "ABC-123",
    //   fine_amount: 60,
    //   category_id: "",
    // };
    // await carRepository.create(newCar);
    // const carId = "ABC-123";
    // const specifications_id = ["spec_id"];
    // const car = await createCarsSpecificationUseCase.execute({
    //   carId,
    //   specifications_id,
    // });
  });
});
