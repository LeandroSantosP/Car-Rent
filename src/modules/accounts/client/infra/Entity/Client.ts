import { Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

export class Client {
  id?: string | null;
  name!: string;
  email!: string;
  password!: string;
  driver_license!: string;
  admin?: boolean | null;
  avatar?: string | null;
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }

    if (!this.admin) {
      this.admin = false;
    }
  }
}
