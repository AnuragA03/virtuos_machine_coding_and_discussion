-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `StudentName` VARCHAR(191) NOT NULL,
    `CollegeName` VARCHAR(191) NOT NULL,
    `Round1Marks` DOUBLE NOT NULL,
    `Round2Marks` DOUBLE NOT NULL,
    `Round3Marks` DOUBLE NOT NULL,
    `TechnicalRoundMarks` DOUBLE NOT NULL,
    `TotalMarks` DOUBLE NOT NULL,
    `Result` VARCHAR(191) NOT NULL,
    `Rank` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
