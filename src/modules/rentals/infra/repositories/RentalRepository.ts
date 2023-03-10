import { prisma } from "@/modules/shared/prisma/client";
import {
  IRentalsRepository,
  UpdateRentalProps,
} from "../../repositories/IRantalsRepository";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../Entities/Rental";

export class RentalRepository implements IRentalsRepository {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async updateRental({
    id,
    end_date,
    expect_return_Date,
    total,
  }: UpdateRentalProps): Promise<Rental> {
    const rental = await this.prisma.rantals.update({
      where: {
        id,
      },
      data: {
        total,
        expect_return_Date,
        end_date,
      },
    });
    return rental;
  }

  async findRentalById(id: string): Promise<Rental | null> {
    const rental = await this.prisma.rantals.findUnique({
      where: {
        id,
      },
    });

    return rental;
  }
  async findOpenRentalByCarId(card_id: string): Promise<Rental | null> {
    const rental = await this.prisma.rantals.findFirst({
      where: {
        carId: card_id,
        end_date: null,
      },
    });

    return rental;
  }
  async findOpenRentalByClient(client_id: string): Promise<Rental | null> {
    const rental = await this.prisma.rantals.findFirst({
      where: {
        clientId: client_id,
        end_date: null,
      },
    });

    return rental;
  }
  async create({
    car_id,
    client_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.prisma.rantals.create({
      data: {
        expect_return_Date: expected_return_date,
        carId: car_id,
        clientId: client_id,
      },
    });

    return rental;
  }
}
