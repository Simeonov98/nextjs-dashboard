import {column, PrismaClient, users} from 'prisma/generated/prisma/client'


export default async function seedTasks(prisma:PrismaClient,{columns,users}:any) {
    //console.log({users,columns})
    const backlog = columns.find((c:any)=> c.name==='backlog')

    await prisma.tasks.upsert({
        where:{
            title_owner_id:{
                title: 'Prepare report',
                owner_id: users.ceo.id
            },
        },
        update:{
            columnId: backlog.id
        },
        create:{
            title: 'Prepare report',
            owner_id: users.ceo.id,
            columnId: backlog.id,
            executors:{
                connect:[{id: users.rnd.id}]
            }
        }
    })
}