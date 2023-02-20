import { CategoryDTO } from "../repositories/dtos/CategoryDTO";

export class Category {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;

  constructor(props: CategoryDTO) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.created_at = props.created_at;
  }
}
