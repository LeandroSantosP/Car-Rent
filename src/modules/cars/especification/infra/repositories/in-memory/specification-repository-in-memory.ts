import { Specification } from "../../Entity/Specification";
import { createResponse } from "../implematation/SpecificationRepository";
import {
  ISpecificationRepository,
  ISpecificationRepositoryProps,
} from "../ISpecificationRepository";

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  async create({
    description,
    name,
    license_plate,
  }: ISpecificationRepositoryProps): Promise<createResponse> {
    const newSpecification = new Specification();

    Object.assign(newSpecification, {
      description,
      name,
      license_plate,
    });
    return newSpecification as any;
  }
  specifications: Specification[] = [];

  async FindSpecification(name: string): Promise<Specification | null> {
    const Speciation = this.specifications.find((spec) => spec.name === name);

    if (!Speciation) {
      return null;
    }

    return Speciation;
  }
}
