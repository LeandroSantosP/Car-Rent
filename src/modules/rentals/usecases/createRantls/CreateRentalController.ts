import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date } = req.body;

    const { id } = req.client;

    const repository = container.resolve(CreateRentalUseCase);
    const rental = await repository.execute({
      car_id,
      client_id: id,
      expected_return_date,
    });

    return res.status(201).json(rental);
  }
}
