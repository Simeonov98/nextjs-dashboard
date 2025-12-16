import { PrismaClient } from 'prisma/generated/prisma/client'
import bcrypt from 'bcrypt'


export default async function seedUsers(prisma: PrismaClient, roles: Record<string, { id: number }>) {
    const password = await bcrypt.hash('asdasd', 10)

    async function upsertUser(name: string, email: string, roleId: number) {
        return prisma.users.upsert({
            where: { email },
            update: { name, roleId },
            create: { name, email, password, roleId }
        })
    }


    const admin = await upsertUser('Admin', 'admin@mail.com', roles.admin.id)
    const ceo = await upsertUser('Chief', 'chief@mail.com', roles.chief.id)
    const rnd = await upsertUser('RnD Manager', 'rnd@mail.com', roles.rnd.id)
    const senior = await upsertUser('Senior', 'senior@mail.com', roles.senior.id)
    const mid = await upsertUser('Mid', 'mid@mail.com', roles.mid.id)
    const junior = await upsertUser('Junior', 'junior@mail.com', roles.junior.id)

    return { admin, ceo, rnd, senior, mid, junior }
}