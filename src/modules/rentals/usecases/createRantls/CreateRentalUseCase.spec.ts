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
    const rental = await createRentalUseCase.execute({
      client_id: "12345",
      car_id: "12312313",
      expected_return_date: add24hors,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if client already rented someone car.", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        client_id: "123",
        car_id: "321",
        expected_return_date: add24hors,
      });
      await createRentalUseCase.execute({
        client_id: "123",
        car_id: "321",
        expected_return_date: add24hors,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if car already rented for someone", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        client_id: "123",
        car_id: "12312313",
        expected_return_date: add24hors,
      });
      await createRentalUseCase.execute({
        client_id: "321",
        car_id: "12312313",
        expected_return_date: add24hors,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if expected return date is less than 24 hours.", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        client_id: "123",
        car_id: "12312313",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
