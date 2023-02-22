export interface ClientDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  admin?: boolean;
  avatar: string;
  created_at?: Date;
}
