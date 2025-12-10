import { fetchAllColumns } from "@/app/lib/data";
import { fetchAllTasks } from "@/app/lib/tasks";
import BoardClient from "./BoradClient";
import { column, users } from 'prisma/generated/prisma/client';


export default async function Board({ user, childUsers }: { user: users ,childUsers: users[]}) {
  // fetch tasks for the user (fetchAllTasks expects a user id)
  const tasks = await fetchAllTasks(user.id);
  const columns = await fetchAllColumns();

  return <BoardClient initialCards={tasks} columns={columns} user={user} children={childUsers} />;
}
