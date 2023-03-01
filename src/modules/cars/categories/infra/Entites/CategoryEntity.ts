import { Car } from "@/modules/cars/cars/infra/Entites/Car";
import { v4 as uuidV4 } from "uuid";

export class Category {
  id?: string;
  name!: string;
  description!: string;
  created_at?: Date;
  Car?: Car[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}
