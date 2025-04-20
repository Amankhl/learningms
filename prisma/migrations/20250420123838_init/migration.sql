/*
  Warnings:

  - You are about to drop the column `courseId` on the `Attendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_courseId_fkey";

-- DropIndex
DROP INDEX "Attendance_userId_courseId_date_key";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "courseId";

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_date_key" ON "Attendance"("userId", "date");
