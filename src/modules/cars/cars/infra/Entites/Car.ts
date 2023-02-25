import { Specification } from "@/modules/cars/especification/infra/Entity/Specification";
import { v4 as uuidV4 } from "uuid";
import { CarImage } from "./CarImage";

export class Car {
  id?: string;
  name!: string;
  description!: string;
  daily_rate!: number;
  available?: boolean;
  license_plate!: string;
  fine_amount!: number;
  brand!: string;
  category_id?: string;
  created_at?: Date;
  Specification_Cars?: Specification[];
  car_image?: CarImage[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    if (!this.created_at) {
      this.created_at = new Date();
    }
    if (!this.available) {
      this.available = true;
    }
  }
}
