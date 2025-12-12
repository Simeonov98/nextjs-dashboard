import { auth } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import  AddUserForm from "@/app/ui/dashboard/addUser/addUserForm";



export default async function AddUserPage(){
  const session = await auth()
  if (!session?.user?.id) return redirect('/login')

  const fullUser = await prisma.users.findUnique({
    where: { id: session.user.id },
    include: {
      role: {
        include: {
          children: true, // get child roles
        },
      },
    },
  });
  if (!fullUser) return null
  const roles = await prisma.role.findMany()
  if (!roles) return null
  const allUsers = await prisma.users.findMany()
  if (!allUsers) return null


    return(
        <AddUserForm owner={fullUser} roles={roles} allUsers={allUsers}/>
    )
} 