import {Prisma, PrismaClient} from 'prisma/generated/prisma/client'

async function upsertRoles(prisma: PrismaClient,name:string,level:number,parentId?:number){
    return prisma.role.upsert({
        where:{ name },
        update:{ level, parentId },
        create: { name,level, parentId}
    })
}
export default async function seedRoles(prisma:PrismaClient){
    //                                  prisma, name , level
    const admin     = await upsertRoles(prisma,'Admin',1)
    const chief     = await upsertRoles(prisma,'Chief',2)
    const rnd       = await upsertRoles(prisma,'RnD Manager',3,chief.id)       
    const lead      = await upsertRoles(prisma,'Software Lead',4,rnd.id)
    const senior    = await upsertRoles(prisma,'Senior Software Developer',5,lead.id)    
    const mid       = await upsertRoles(prisma,'Mid Software Developer',6,senior.id)
    const junior    = await upsertRoles(prisma,'Junior Software Developer',7,mid.id)    
    const intern    = await upsertRoles(prisma,'Intern',8,junior.id)    

    return {admin,chief,rnd,lead,senior,mid,junior,intern}
}
