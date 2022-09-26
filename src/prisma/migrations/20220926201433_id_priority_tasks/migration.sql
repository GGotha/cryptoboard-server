/*
  Warnings:

  - You are about to drop the column `priority_level` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `priority_level`,
    ADD COLUMN `id_task_priority` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_id_task_priority_fkey` FOREIGN KEY (`id_task_priority`) REFERENCES `task_priorities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
