/*
  Warnings:

  - You are about to drop the `CagetoryWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `CagetoryWork`;

-- DropTable
DROP TABLE `Position`;

-- CreateTable
CREATE TABLE `JobCategory` (
    `JobCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobCategoryName` VARCHAR(191) NOT NULL,
    `JobCategoryIcon` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `JobCategory_JobCategoryName_key`(`JobCategoryName`),
    PRIMARY KEY (`JobCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobPosition` (
    `JobPositionId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobPositionName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`JobPositionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
