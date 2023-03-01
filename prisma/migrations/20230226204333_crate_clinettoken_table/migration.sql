-- CreateTable
CREATE TABLE "client_token" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client_token" ADD CONSTRAINT "client_token_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
