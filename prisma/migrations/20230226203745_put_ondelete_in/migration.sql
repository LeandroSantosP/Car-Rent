-- DropForeignKey
ALTER TABLE "rantals" DROP CONSTRAINT "rantals_carId_fkey";

-- AddForeignKey
ALTER TABLE "rantals" ADD CONSTRAINT "rantals_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
