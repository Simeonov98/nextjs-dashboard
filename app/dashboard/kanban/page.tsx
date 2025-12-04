//"use client"
// import { Card } from "@/app/ui/dashboard/cards";
// import { useState } from "react";

import Board from "@/app/ui/kanaban/board";
import { auth } from "@/lib/auth";

export default async function KanbanPage() {
  const session = await auth()
  if (!session) return null
  return (
    <div className="h-screen w-full bg-neutral-50 text-neutral-500 border rounded-xl">
      <Board user={session?.user}/>
    </div>
  );
}
