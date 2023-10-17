/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `CourseOnUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseOnUser_userId_courseId_key" ON "CourseOnUser"("userId", "courseId");
