'use server'
import { prisma } from '@/lib/prisma';
import { users } from '@prisma/client';
import { revalidatePath } from 'next/cache';




export async function fetchAllTasks() {
  return prisma.tasks.findMany();
}

export async function createTask(title: string, columnId: number, user: users) {
  // const user = session?.user
  if (!user) {
    console.error('createTask::ERROR: No user');
    return null;
  }
  if (!user.id) {
    console.error('createTask::ERROR: No user ID');
    return null;
  }

  console.log(`createTask Called with:1)title:${title} 2)columnId:${columnId} 3)user.id:${user.id}`)
  try{
    const result = await prisma.tasks.create({
      data:{
        title,
        columnId,
        owner_id: user.id
      }
    })
    console.log(`Create task is successful: ${JSON.stringify(result, null, 4)}`)
    return result
  } catch (error){
    console.log(`Error in update task:${error}`)
    // throw new Error()
    return null;
  }
  
  // return prisma.tasks.create({
  //   data: {
  //     title,
  //     columnId,
  //     owner_id: user.id,
  //   },
  // });
}

export async function updateTask(id: string, columnId: number, title?: string) {
  console.log(id, columnId, title)
  return prisma.tasks.update({
    where: { id },
    data: {
      columnId,
      title
    },
  });
}

export async function deleteTask(id: string) {
  return prisma.tasks.delete({ where: { id } });
}
