import { Specification } from "../../Entity/Specification";
import {
  ISpecificationRepository,
  ISpecificationRepositoryProps,
} from "../ISpecificationRepository";

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];

  async FindSpecification(name: string): Promise<Specification | null> {
    const Speciation = this.specifications.find((spec) => spec.name === name);

    if (!Speciation) {
      return null;
    }

    return Speciation;
  }

  async create({
    description,
    name,
  }: ISpecificationRepositoryProps): Promise<Specification> {
    const newSpecification = new Specification();

    Object.assign(newSpecification, {
      description,
      name,
    });
    return newSpecification;
  }
}
