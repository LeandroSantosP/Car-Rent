import "reflect-metadata";
import { DayJsDateProvider } from "@/modules/shared/provider/DateProvider/implemetations/DayJsDateProvider";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { describe } from "node:test";
import dayjs from "dayjs";
import { ICarRepository } from "@/modules/cars/cars/infra/repositories/ICarRepository";
import { CarRepositoryInMemory } from "@/modules/cars/cars/infra/repositories/in-memory/car-repository-in-memory";

let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carRepository: ICarRepository;
let dayjsProvider: IDateProvider;

describe("create Rental", () => {
  const add24hors = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayJsDateProvider();
    carRepository = new CarRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsProvider,
      carRepository
    );
  });

  it("should be able to create a new rental.", async () => {
    carRepository.create({
      brand: "fiat",
      name: "uno",
      description: "desc",
      daily_rate: 23,
      license_plate: "123-abc",
      fine_amount: 12,
      category_id: "123",
    });

    const car = await carRepository.GetCarByLicensePlate("123-abc");

    const rental = await createRentalUseCase.execute({
      client_id: "12345",
      car_id: car?.id!,
      expected_return_date: add24hors,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if client already rented someone car.", async () => {
    await createRentalUseCase.execute({
      client_id: "123",
      car_id: "321",
      expected_return_date: add24hors,
    });
    await expect(
      createRentalUseCase.execute({
        client_id: "123",
        car_id: "321",
        expected_return_date: add24hors,
      })
    ).rejects.toEqual(new AppError("Car Is UnAvailable!"));
  });

  it("should not be able to create a new rental if car already rented for someone", async () => {
    const car = await rentalRepositoryInMemory.create({
      car_id: "12312313",
      client_id: "123",
      expected_return_date: add24hors,
    });

    await expect(
      createRentalUseCase.execute({
        client_id: "321",
        car_id: "12312313",
        expected_return_date: add24hors,
      })
    ).rejects.toEqual(new AppError("Car Is UnAvailable!"));
  });

  it("should not be able to create a new rental if expected return date is less than 24 hours.", async () => {
    await expect(
      createRentalUseCase.execute({
        client_id: "123",
        car_id: "12312313",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Is required to be greater than 24 hours."));
  });
});
