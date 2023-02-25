/* eslint-disable indent */
import { Car } from "@/modules/cars/cars/infra/Entites/Car";
import { Specification } from "../../Entity/Specification";
import { createResponse } from "../implematation/SpecificationRepository";
import {
  ISpecificationRepository,
  ISpecificationRepositoryProps,
} from "../ISpecificationRepository";

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  public specifications: Specification[] = [];

  async ListAllSpecification(): Promise<Specification[]> {
    return this.specifications;
  }
  async create({
    id,
    description,
    name,
    license_plate,
  }: ISpecificationRepositoryProps): Promise<createResponse> {
    const newSpecification = new Specification();

    Object.assign(newSpecification, {
      id,
      description,
      name,
      license_plate,
    });

    this.specifications.push(newSpecification);
    return newSpecification as any;
  }
  async createMany(specifications: string[], carId: string): Promise<void> {
    const specification = this.specifications.map((spec) => {
      spec.Specification_Cars?.push();
    });
    throw new Error("Method not implemented.");
  }

  async FindByIds(ids: string[]): Promise<Specification[]> {
    const AllSpecification = this.specifications.filter((spec) => {
      if (spec.id) {
        return ids.includes(spec.id);
      }
    });

    return AllSpecification;
  }

  async FindSpecification(name: string): Promise<Specification | null> {
    const Speciation = this.specifications.find((spec) => spec.name === name);

    if (!Speciation) {
      return null;
    }

    return Speciation;
  }
}
