/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `presentation` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "description",
ADD COLUMN     "presentation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL;
