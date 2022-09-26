-- CreateTable
CREATE TABLE `task_helps` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `id_user` VARCHAR(191) NULL,
    `id_task` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task_helps` ADD CONSTRAINT `task_helps_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_helps` ADD CONSTRAINT `task_helps_id_task_fkey` FOREIGN KEY (`id_task`) REFERENCES `tasks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
