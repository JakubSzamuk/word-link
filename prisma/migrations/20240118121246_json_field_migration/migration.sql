/*
  Warnings:

  - You are about to drop the column `group1` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `group2` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `group3` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `group4` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `groups` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `group1`,
    DROP COLUMN `group2`,
    DROP COLUMN `group3`,
    DROP COLUMN `group4`,
    ADD COLUMN `groups` JSON NOT NULL;
