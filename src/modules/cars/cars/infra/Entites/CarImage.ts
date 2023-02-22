import { v4 as uuidV4 } from "uuid";
class CarImage {
  id?: string;
  image_name!: string;
  carId!: string | null;
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}

export { CarImage };
