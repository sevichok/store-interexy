/*
  Warnings:

  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('active', 'canceled', 'completed');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- DropEnum
DROP TYPE "RoleTypes";
