/*
  Warnings:

  - The values [PUBLISED] on the enum `LessonState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LessonState_new" AS ENUM ('HIDDEN', 'PUBLISHED', 'PUBLIC');
ALTER TABLE "Lesson" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Lesson" ALTER COLUMN "state" TYPE "LessonState_new" USING ("state"::text::"LessonState_new");
ALTER TYPE "LessonState" RENAME TO "LessonState_old";
ALTER TYPE "LessonState_new" RENAME TO "LessonState";
DROP TYPE "LessonState_old";
ALTER TABLE "Lesson" ALTER COLUMN "state" SET DEFAULT 'HIDDEN';
COMMIT;
