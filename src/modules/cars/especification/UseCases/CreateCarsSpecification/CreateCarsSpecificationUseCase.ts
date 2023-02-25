import { AppError } from "@/modules/shared/infra/middleware/AppError";

import { inject, injectable } from "tsyringe";
import { Car } from "../../../cars/infra/Entites/Car";
import { ICarRepository } from "../../../cars/infra/repositories/ICarRepository";
import { ISpecificationRepository } from "../../infra/repositories/ISpecificationRepository";

interface IRequest {
  carId: string;
  specifications_id: string[];
}

interface SpecOfCar {
  specification: {
    id: string;
    name: string;
    description: string;
    created_at: Date;
  };
}

@injectable()
export class CreateCarsSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ specifications_id, carId }: IRequest): Promise<Car | null> {
    const carExits = await this.carRepository.GetCarById(carId);

    if (!carExits) {
      throw new AppError("Car does not Exits!");
    }

    const allSpecification = await this.specificationRepository.FindByIds(
      specifications_id
    );

    const specIDsForRegister: string[] = [];
    for (let i = 0; i < allSpecification.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      specIDsForRegister.push(allSpecification[i].id!);
    }

    const SpecificationOfCarRegistered = carExits.Specification_Cars?.map(
      (spec: SpecOfCar | any) => {
        return spec.specification.id;
      }
    );

    SpecificationOfCarRegistered?.forEach((specRegister) => {
      if (specRegister && specIDsForRegister.includes(specRegister)) {
        throw new AppError(
          `Specification "${specRegister}" already Cadaster for this car!`
        );
      }
    });

    await this.specificationRepository.createMany(
      specIDsForRegister as string[],
      carId
    );

    /* Refatorar, os dados deven retorna atualizados { id } = req.client; delay de 1 request */
    return carExits;
  }
}

/* 

*/
