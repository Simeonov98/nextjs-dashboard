import { PrismaClient } from 'prisma/generated/prisma/client'

export default async function seedColumns(prisma: PrismaClient) {
    const names = ['backlog', 'todo', 'in-progress', 'done']


    for (const name of names) {
        await prisma.column.upsert({
            where: { name },
            update: {},
            create: { name }
        })
    }
    return prisma.column.findMany()
}