-- CreateTable
CREATE TABLE `ProfilePicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileKey` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `blurDataUrl` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProfilePicture_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfilePicture` ADD CONSTRAINT `ProfilePicture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
