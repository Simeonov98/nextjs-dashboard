'use server'
import { prisma } from '@/lib/prisma';
import { users } from 'prisma/generated/prisma/client';
import { revalidatePath } from 'next/cache';
import { userAgent } from 'next/server';




export async function fetchAllTasks(userId: string) {
  const user = await prisma.users.findUnique({
    where: { id: userId},
    include: { role: true }
  })
  if (!user) throw new Error('User not found')
  return prisma.tasks.findMany({
    where: {
      owner: {
        role: {
          level: {
            gte: user.role.level,
          },
        },
      },
    },
    include: {
      owner: { 
        include: {
          role: true,
        }
      },
      column: true,
      executors: true,
    }
  })

  }

export async function createTask(title: string, columnId: number, user: users, executorsIds?: string[]) {
  // const user = session?.user
  if (!user) {
    console.error('createTask::ERROR: No user');
    return null;
  }
  if (!user.id) {
    console.error('createTask::ERROR: No user ID');
    return null;
  }
  const assignedExecutors = executorsIds?.length ? executorsIds : [user.id];
  
  console.log(
    `createTask Called with: 
    1) title: ${title} 
    2) columnId: ${columnId} 
    3) owner: ${user.id}
    4) executors: ${assignedExecutors}`
  );

  try{
    const result = await prisma.tasks.create({
      data:{ 
        title,
        columnId,
        owner_id: user.id,
        executors: {
          connect: assignedExecutors.map((id) => ({ id })),
        },
      },
      include:{
        owner: true,
        column: true,
        executors: true,
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
