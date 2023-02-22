-- CreateTable
CREATE TABLE "car_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" TEXT,
    CONSTRAINT "car_images_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
