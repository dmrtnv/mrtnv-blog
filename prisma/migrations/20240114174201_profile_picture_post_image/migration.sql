/*
  Warnings:

  - You are about to drop the `PostMedia` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `blurDataUrl` on table `ProfilePicture` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `PostMedia` DROP FOREIGN KEY `PostMedia_postId_fkey`;

-- AlterTable
ALTER TABLE `ProfilePicture` MODIFY `blurDataUrl` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `PostMedia`;

-- CreateTable
CREATE TABLE `PostImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileKey` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `blurDataUrl` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostImage` ADD CONSTRAINT `PostImage_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
