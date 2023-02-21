-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daily_rate" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "license_plate" TEXT NOT NULL,
    "fine_amount" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT,
    CONSTRAINT "cars_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_cars" ("available", "brand", "categoryId", "created_at", "daily_rate", "description", "fine_amount", "id", "license_plate", "name") SELECT "available", "brand", "categoryId", "created_at", "daily_rate", "description", "fine_amount", "id", "license_plate", "name" FROM "cars";
DROP TABLE "cars";
ALTER TABLE "new_cars" RENAME TO "cars";
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
