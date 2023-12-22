/*
  Warnings:

  - Added the required column `subTotalPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `quantity` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalPrice` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableAmount` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hashedRt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "subTotalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "totalPrice" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "availableAmount" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashedRt" SET NOT NULL;
