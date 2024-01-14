-- AlterTable
ALTER TABLE `User` ADD COLUMN `super_admin` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `AuthorizedUser` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `super_admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `AuthorizedUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
