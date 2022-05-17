/*
  Warnings:

  - The `phone` column on the `Businesses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `email` column on the `Businesses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Businesses" DROP COLUMN "phone",
ADD COLUMN     "phone" TEXT[],
DROP COLUMN "email",
ADD COLUMN     "email" TEXT[];
