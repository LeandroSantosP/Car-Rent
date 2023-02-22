import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "@/modules/shared/prisma/client";
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
  async create({
    name,
    description,
  }: ICreateCategoryProps): Promise<CategoryDTO> {
    console.log(name);

    const newCategory = await this.prisma.category.create({
      data: {
        description,
        name,
      },
    });

    return newCategory;
  }
  async GetCategoryById(category_id: string): Promise<CategoryDTO | null> {
    console.log(category_id);

    const categoryById = await this.prisma.category.findUnique({
      where: {
        id: category_id ?? "",
      },
    });

    return categoryById;
  }
  async GetCategoryByName(category_name: string): Promise<CategoryDTO | null> {
    const CategoryByName = await this.prisma.category.findFirst({
      where: {
        name: category_name,
      },
    });

    return CategoryByName;
  }
  async ListAllCategory(): Promise<CategoryDTO[]> {
    const AllCategory = await this.prisma.category.findMany();
    return AllCategory;
  }
}
