import { Car } from "@/modules/cars/cars/infra/Entites/Car";
import { Specification } from "../Entity/Specification";
import { createResponse } from "./implematation/SpecificationRepository";

export interface ISpecificationRepositoryProps {
  id?: string;
  name: string;
  description: string;
  license_plate: string;
}

export abstract class ISpecificationRepository {
  abstract create({
    id,
    description,
    name,
    license_plate,
  }: ISpecificationRepositoryProps): Promise<createResponse>;

  abstract createMany(specifications: string[], carId: string): Promise<void>;
  abstract ListAllSpecification(): Promise<Specification[]>;
  abstract FindByIds(ids: string[]): Promise<Specification[]>;

  abstract FindSpecification(name: string): Promise<Specification | null>;
}
