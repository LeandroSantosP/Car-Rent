import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export { prisma };

async function main() {
  const passwordHash = await hash("admin", 9);
  const Leandro = await prisma.client.upsert({
    where: { email: "leandro@gmail.com" },
    update: {},
    create: {
      email: "leandro@gmail.com",
      name: "leandro",
      password: passwordHash,
      driver_license: "12345",
      admin: true,
    },
  });

  const car_witj_category = await prisma.category.create({
    data: {
      name: "Sportivo",
      description: "Carros esportivos",
      Car: {
        connectOrCreate: {
          where: {
            id: "salhbdasbdko",
          },
          create: {
            name: "Ferrari",
            brand: "test",
            description: "UM carro rapido!",
            license_plate: "1234-abcd",
            daily_rate: 12,
            fine_amount: 500,
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
