/*
  Warnings:

  - Made the column `fullName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `fullName` VARCHAR(191) NOT NULL;
