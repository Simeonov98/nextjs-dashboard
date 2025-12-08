/*
  Warnings:

  - You are about to drop the column `lft` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rgt` on the `users` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "_TaskExecutors" ADD CONSTRAINT "_TaskExecutors_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TaskExecutors_AB_unique";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lft",
DROP COLUMN "rgt",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "level" INTEGER NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
