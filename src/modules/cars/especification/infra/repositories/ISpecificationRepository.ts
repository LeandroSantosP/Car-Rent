import { Specification } from "../Entity/Specification";

export interface ISpecificationRepositoryProps {
  name: string;
  description: string;
}

export abstract class ISpecificationRepository {
  abstract create({
    description,
    name,
  }: ISpecificationRepositoryProps): Promise<Specification>;

  abstract FindSpecification(name: string): Promise<Specification | null>;
}
