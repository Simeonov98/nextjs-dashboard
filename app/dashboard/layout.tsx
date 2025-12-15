import { prisma } from "@/lib/prisma";
import { auth } from "../lib/auth";
import SideNav from "../ui/dashboard/sidenav";
import { redirect } from 'next/navigation'

export default async function Layout({children}:{children: React.ReactNode}){
    const session = await auth();
    if(!session) return null
    if(!session.user) return redirect('/login')
    const user = await prisma.users.findUnique({
        where: {id: session?.user.id},
        include:{role:true}
    })
    if (!user) return null
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav user={user}/>
            </div>
            <div className="grow p06 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}