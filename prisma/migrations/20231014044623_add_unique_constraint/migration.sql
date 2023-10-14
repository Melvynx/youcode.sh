/*
  Warnings:

  - A unique constraint covering the columns `[userId,lessonId]` on the table `LessonOnUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LessonOnUser_userId_lessonId_key" ON "LessonOnUser"("userId", "lessonId");
