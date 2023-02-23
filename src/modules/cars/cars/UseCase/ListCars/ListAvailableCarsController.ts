import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
  async handle(req: Request, res: Response) {
    const { car_name, brand, category_id } = req.query;
    const repository = container.resolve(ListAvailableCarsUseCase);
    const result = await repository.execute({
      car_name: car_name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return res.status(200).json(result);
  }
}
