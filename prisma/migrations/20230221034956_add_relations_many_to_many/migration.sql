-- CreateTable
CREATE TABLE "specification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Specification_Cars" (
    "specificationId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    PRIMARY KEY ("specificationId", "carId"),
    CONSTRAINT "Specification_Cars_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "specification" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Specification_Cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
