import { RentalsUseCase } from "./RentalsUseCase";

describe("Preview", () => {
  it("should simulate the rent", async () => {
    const preview = new RentalsUseCase();

    const rent = await preview.execute({
      licensePlate: "ABC-1234",
      days: 7,
      personAge: 18,
    });

    expect(rent).toBe(275);
  });

  it("should simulate the rent", async () => {
    const preview = new RentalsUseCase();

    const rent = await preview.execute({
      licensePlate: "ABC-1111",
      days: 7,
      personAge: 18,
    });

    expect(rent).toBe(235.5);
  });
});
