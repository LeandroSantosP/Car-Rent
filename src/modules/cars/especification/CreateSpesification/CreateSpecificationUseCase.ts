import { inject, injectable } from "tsyringe";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { ISpecificationRepository } from "../infra/repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private SpecificationRepository: ISpecificationRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const specificationAlreadyExists =
      await this.SpecificationRepository.FindSpecification(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification Already Exists!!");
    }

    const newSpecification = await this.SpecificationRepository.create({
      description,
      name,
    });

    return newSpecification;
  }
}
