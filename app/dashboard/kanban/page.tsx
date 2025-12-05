//"use client"
// import { Card } from "@/app/ui/dashboard/cards";
// import { useState } from "react";

import Board from "@/app/ui/kanaban/board";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { users } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function KanbanPage() {
  const session = await auth()
  if (!session?.user?.id) return redirect('/login')

  const fullUser = await prisma.users.findUnique({
    where:{
      id : session?.user?.id
    }
  }) 
  if(!fullUser) return null;
  console.log('FULL USER',fullUser);

  
  return (
    <div className="h-screen w-full bg-neutral-50 text-neutral-500 border rounded-xl">
      <Board user={fullUser}/>
    </div>
  );
}
