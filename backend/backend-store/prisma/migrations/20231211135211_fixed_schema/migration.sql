/*
  Warnings:

  - You are about to drop the column `orderId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `products` table. All the data in the column will be lost.
  - Added the required column `userId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
