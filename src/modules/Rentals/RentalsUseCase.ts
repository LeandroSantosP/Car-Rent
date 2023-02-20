interface IRequestVehicle {
  licensePlate: string;
  days: number;
  personAge: number;
}

/* 

*/

export class RentalsUseCase {
  async execute({
    days,
    personAge,
    licensePlate,
  }: IRequestVehicle): Promise<number> {
    const totalPeriodValue = days * 100;
    const discountForAge = (personAge * 100) / 4;
    const rent = totalPeriodValue - discountForAge;
    const texByVehicleType = rent * 0.1;

    return rent + texByVehicleType;
  }
}
