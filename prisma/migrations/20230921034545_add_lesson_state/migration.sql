-- CreateEnum
CREATE TYPE "LessonState" AS ENUM ('HIDDEN', 'PUBLISED', 'PUBLIC');

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "state" "LessonState" NOT NULL DEFAULT 'HIDDEN';
