import { fetchAllTasks,fetchAllColumns } from "@/app/lib/data";
import BoardClient from "./BoradClient";
import { users } from 'prisma/generated/prisma/client';
 


export default async function Board({user}:{user:users}) {
  const tasks=await fetchAllTasks()
  const columns=await fetchAllColumns()

  return <BoardClient initialCards={tasks} columns={columns} user={user}/>
  
}
