import fs from "fs";
import csvParse from "csv-parse";
import { ICategoryRepository } from "../infra/repositories/ICategoryRepository";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { inject, injectable } from "tsyringe";

interface IImportRequest {
  name: string;
  description: string;
}

@injectable()
export class importNewCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  private async loadCategories(
    file: Express.Multer.File
  ): Promise<IImportRequest[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportRequest[] = [];
      const parseFile = csvParse.parse();
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { description, name } = category;
      const categoryExists = await this.categoryRepository.GetCategoryByName(
        name
      );

      if (!categoryExists) {
        return await this.categoryRepository.create({ description, name });
      }

      return;
    });
  }
}
