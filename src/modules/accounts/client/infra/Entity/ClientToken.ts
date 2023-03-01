import { v4 as uuidV4 } from "uuid";

export class ClientToken {
  id?: string;
  refresh_token!: string;
  clientId!: string;
  expire_date!: Date;
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
