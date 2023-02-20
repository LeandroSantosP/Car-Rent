export interface CarDTO {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available?: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  created_at?: Date;
}
