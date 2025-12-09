//"use client"
// import { Card } from "@/app/ui/dashboard/cards";
// import { useState } from "react";

import Board from "@/app/ui/kanaban/board";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { fetchAllTasks }  from "@/app/lib/tasks";
import { fetchAllColumns } from "@/app/lib/data"
import { tasks, users } from "prisma/generated/prisma/client";

export default async function KanbanPage() {
  const session = await auth()
  if (!session?.user?.id) return redirect('/login')

  const fullUser = await prisma.users.findUnique({
    where:{ id : session.user.id},
    include: { role: true }
  }) 
  if(!fullUser) return null;
  console.log('FULL USER',fullUser);
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
      </div>
      <Board user={fullUser} />
    </div>
  );
}
