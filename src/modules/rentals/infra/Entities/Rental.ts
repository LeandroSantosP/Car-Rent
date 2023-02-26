import { v4 as uuidV4 } from "uuid";

export class Rental {
  id?: string;
  start_date?: Date;
  end_date?: Date | null;
  expect_return_Date!: Date;
  total?: number | null;
  created_at?: Date;
  updated_at?: Date;
  carId!: string;
  clientId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.end_date) {
      this.end_date = null;
    }
  }
}
