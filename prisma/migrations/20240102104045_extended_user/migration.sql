-- AlterTable
ALTER TABLE `Comment` MODIFY `text` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `profilePictureUrl` VARCHAR(191) NULL;
