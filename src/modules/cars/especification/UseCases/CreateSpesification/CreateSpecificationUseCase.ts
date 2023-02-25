import { inject, injectable } from "tsyringe";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { ISpecificationRepository } from "../../infra/repositories/ISpecificationRepository";

import { ICarRepository } from "../../../cars/infra/repositories/ICarRepository";

interface IRequest {
  name: string;
  description: string;
  license_plate: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private SpecificationRepository: ISpecificationRepository,

    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({ description, name, license_plate }: IRequest) {
    const carExists = await this.carRepository.GetCarByLicensePlate(
      license_plate
    );

    if (!carExists) {
      throw new AppError("License Plate does not exits!");
    }

    const specificationAlreadyExists =
      await this.SpecificationRepository.FindSpecification(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification Already Exists!!");
    }

    const newSpecification = await this.SpecificationRepository.create({
      description,
      name,
      license_plate,
    });

    return newSpecification;
  }
}
