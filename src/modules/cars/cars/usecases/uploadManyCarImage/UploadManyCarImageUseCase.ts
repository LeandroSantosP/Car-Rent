import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IRequest {
  car_image: string[];
  car_id: string;
}

export class UploadManyCarImageUseCase {
  constructor(private carRepository: ICarRepository) {}

  public async execute({ car_id, car_image }: IRequest) {
    /* Create a new feature where the admin can aad more of one car image for time! */

    car_image.map(async (image): Promise<void> => {
      await this.carRepository.CreateManyImage(car_id, car_image);
    });
  }
}
