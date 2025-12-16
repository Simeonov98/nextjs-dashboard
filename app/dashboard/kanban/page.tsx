//"use client"
// import { Card } from "@/app/ui/dashboard/cards";
// import { useState } from "react";

import Board from "@/app/ui/kanaban/board";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { fetchAllTasks } from "@/app/lib/tasks";
import { fetchAllColumns } from "@/app/lib/data"
import { tasks, users } from "prisma/generated/prisma/client";

export default async function KanbanPage() {
  const session = await auth()
  if (!session?.user?.id) return redirect('/login')

  const fullUser = await prisma.users.findUnique({
    where: { id: session.user.id },
    include: {
      role: {
        include: {
          children: {
            include: {
              users: true
            }
          }, // get child roles
        },
      },
    },
  });
  if (!fullUser) return null;

  // const childRoleIds = fullUser.role.children.map((r) => r.id);
  const childRoleIds = fullUser.role.children.map((r) => r.id);


  // Fetch users with those roles
  const childUsers = await prisma.users.findMany({
    where: {
      roleId: { in: childRoleIds },
    },
  });

  console.log('FULL USER', fullUser);

  const subordinates = await prisma.$queryRaw<users[]>`
  WITH RECURSIVE role_tree as (
    SELECT id
  FROM role
  WHERE id = ${fullUser.roleId}

  UNION ALL

  SELECT r.id
  FROM role r
  JOIN role_tree rt ON r."parentId" = rt.id
  )
  SELECT u.*
  FROM users u
  WHERE u."roleId" IN (SELECT id FROM role_tree)
  AND u.id != ${fullUser.id};
  `;







  // const tasks=await fetchAllTasks(fullUser.id)
  // if(!tasks) return null;
  // const columns=await fetchAllColumns()
  // if(!columns) return null;


  return (
    <div className="h-full w-full bg-neutral-50 text-neutral-500 border rounded-xl overflow-auto">
      <div className="flex flex-row p-4 border-b ">
        <div className="p-4 font-bold border rounded-xl text-blue-500">Kanban Board</div>
        <p className="p-4 font-bold border rounded-xl text-indigo-500">{fullUser.name}</p>
        <p className="p-4 font-bold border rounded-xl text-indigo-500">{fullUser.email}</p>
        <p className="p-4 font-bold border rounded-xl text-indigo-500">{subordinates.length}</p>
      </div>
      <Board user={fullUser} childUsers={subordinates} />
    </div>
  );
}
