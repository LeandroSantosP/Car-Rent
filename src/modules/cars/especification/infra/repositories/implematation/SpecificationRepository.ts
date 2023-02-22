import { prisma } from "../../../../../shared/prisma/client";
import { Specification } from "../../Entity/Specification";

import {
  ISpecificationRepository,
  ISpecificationRepositoryProps,
} from "../ISpecificationRepository";

export interface createResponse {
  specification: {
    description: string;
    name: string;
  };
  car: {
    description: string;
    name: string;
    category: {
      description: string;
      name: string;
    } | null;
  };
}

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
    license_plate,
  }: ISpecificationRepositoryProps): Promise<createResponse> {
    const newSpecification = new Specification();

    Object.assign(newSpecification, {
      name,
      description,
    });

    const specification = await this.prisma.specification_Cars.create({
      data: {
        specification: {
          create: {
            description,
            name,
          },
        },
        car: {
          connect: {
            license_plate,
          },
        },
      },

      select: {
        car: {
          select: {
            name: true,
            description: true,
            category: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
        specification: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    return specification;
  }
}
