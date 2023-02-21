import { prisma } from "../../../../../shared/prisma/client";
import { Specification } from "../../Entity/Specification";

import {
  ISpecificationRepository,
  ISpecificationRepositoryProps,
} from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }
  async FindSpecification(name: string): Promise<Specification | null> {
    const specification = await this.prisma.specification.findFirst({
      where: {
        name,
      },
    });

    return specification;
  }

  async create({
    description,
    name,
  }: ISpecificationRepositoryProps): Promise<Specification> {
    const newSpecification = new Specification();

    Object.assign(newSpecification, {
      name,
      description,
    });

    const specification = await this.prisma.specification.create({
      data: {
        name: newSpecification.name,
        description: newSpecification.description,
      },
    });

    return specification;
  }
}
