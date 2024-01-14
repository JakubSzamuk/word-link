-- CreateTable
CREATE TABLE `Quiz` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `group1` VARCHAR(191) NULL,
    `group2` VARCHAR(191) NULL,
    `group3` VARCHAR(191) NULL,
    `group4` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `creator` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
