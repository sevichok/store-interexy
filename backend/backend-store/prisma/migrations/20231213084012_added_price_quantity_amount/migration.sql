/*
  Warnings:

  - You are about to drop the column `hash` on the `users` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "totalPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "availableAmount" INTEGER,
ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "hash",
ADD COLUMN     "password" TEXT NOT NULL;
