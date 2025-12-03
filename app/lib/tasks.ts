'use server'
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';


export async function getCurrentUser() {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("Not authenticated");
  return session.user;
}

export async function fetchAllTasks() {
  return prisma.tasks.findMany();
}

export async function createTask(title: string, column: string) {
  const user = await getCurrentUser();
  return prisma.tasks.create({
    data: {
      title,
      column,
      owner_id: user.id,
    },
  });
}

export async function updateTask(id: string, column: string, title?: string) {
  return prisma.tasks.update({
    where: { id },
    data: { column, title },
  });
}

export async function deleteTask(id: string) {
  return prisma.tasks.delete({ where: { id } });
}
