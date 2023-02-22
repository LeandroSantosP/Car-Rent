import { Specification } from "../Entity/Specification";
import { createResponse } from "./implematation/SpecificationRepository";

export interface ISpecificationRepositoryProps {
  name: string;
  description: string;
  license_plate: string;
}

export abstract class ISpecificationRepository {
  abstract create({
    description,
    name,
    license_plate,
  }: ISpecificationRepositoryProps): Promise<createResponse>;

  abstract FindSpecification(name: string): Promise<Specification | null>;
}
