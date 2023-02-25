-- DropForeignKey
ALTER TABLE "car_images" DROP CONSTRAINT "car_images_carId_fkey";

-- CreateTable
CREATE TABLE "rantals" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "expect_return_Date" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "carId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "rantals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rantals" ADD CONSTRAINT "rantals_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rantals" ADD CONSTRAINT "rantals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_images" ADD CONSTRAINT "car_images_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
