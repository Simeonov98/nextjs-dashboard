import { fetchAllTasks } from "@/app/lib/data";
import BoardClient from "./BoradClient";
import { users } from "@prisma/client";
 


export default async function Board(user:users) {
  const tasks=await fetchAllTasks()

  return <BoardClient initialCards={tasks} user={user}/>
  
}
