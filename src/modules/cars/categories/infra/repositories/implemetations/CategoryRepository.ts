import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "../../../../../shared/prisma/client";
import { Category } from "../../Entites/CategoryEntity";
import { CategoryDTO } from "../dtos/CategoryDTO";
import {
  ICategoryRepository,
  ICreateCategoryProps,
} from "../ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async create({ name, description }: ICreateCategoryProps): Promise<Category> {
    const newCategory = await this.prisma.category.create({
      data: {
        description,
        name,
      },
    });

    return newCategory;
  }
  async GetCategoryById(category_id: string): Promise<Category | null> {
    const categoryById = await this.prisma.category.findUnique({
      where: {
        id: category_id ?? "",
      },
    });

    return categoryById;
  }
  async GetCategoryByName(category_name: string): Promise<Category | null> {
    const CategoryByName = await this.prisma.category.findFirst({
      where: {
        name: category_name,
      },
    });

    return CategoryByName;
  }
  async ListAllCategory(): Promise<Category[]> {
    const AllCategory = await this.prisma.category.findMany();
    return AllCategory;
  }

  async PutCategoryOnCar(
    category_name: string,
    license_plate: string
  ): Promise<Category> {
    const categoryCar = await this.prisma.category.update({
      where: {
        name: category_name,
      },
      data: {
        Car: {
          connect: {
            license_plate,
          },
        },
      },
    });

    return categoryCar;
  }
}
