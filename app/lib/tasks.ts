'use server'
import { prisma } from '@/lib/prisma';
import { users } from '@prisma/client';




export async function fetchAllTasks() {
  return prisma.tasks.findMany();
}

export async function createTask(title: string, columnId: number, user:users) {
  // const user = session?.user
  if (!user) return null;
  if (!user.id) return null;
  return prisma.tasks.create({
    data: {
      title,
      columnId,
      owner_id: user.id,
    },
  });
}

export async function updateTask(id: string, columnId: number, title?: string) {
  console.log(id,columnId,title)
  return prisma.tasks.update({
    where: { id },
    data: { columnId, title },
  });
}

export async function deleteTask(id: string) {
  return prisma.tasks.delete({ where: { id } });
}
