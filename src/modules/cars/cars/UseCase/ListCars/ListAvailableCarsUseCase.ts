import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/Entites/Car";
import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IRequest {
  brand?: string;
  car_name?: string;
  category_id?: string;
}
@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository
  ) {}
  async execute({ car_name, brand, category_id }: IRequest): Promise<Car[]> {
    const allCard = await this.carsRepository.ListAllCars(
      brand,
      category_id,
      car_name
    );

    return allCard;
  }
}
