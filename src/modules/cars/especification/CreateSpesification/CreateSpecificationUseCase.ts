import { inject, injectable } from "tsyringe";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { ISpecificationRepository } from "../infra/repositories/ISpecificationRepository";
import { CarRepository } from "../../cars/infra/repositories/implemetations/CarRepository";

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
    private carRepository: CarRepository
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
