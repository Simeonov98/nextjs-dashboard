import { PrismaClient } from 'prisma/generated/prisma/client'

export default async function seedRevenue(prisma: PrismaClient) {
    const check = await prisma.revenue.findMany()
    const data = [
        { month: 'Jan', revenue: 2000 },
        { month: 'Feb', revenue: 1800 },
        { month: 'Mar', revenue: 2200 },
        { month: 'Apr', revenue: 2500 },
        { month: 'May', revenue: 2300 },
        { month: 'Jun', revenue: 3200 },
        { month: 'Jul', revenue: 3500 },
        { month: 'Aug', revenue: 3700 },
        { month: 'Sep', revenue: 2500 },
        { month: 'Oct', revenue: 2800 },
        { month: 'Nov', revenue: 3000 },
        { month: 'Dec', revenue: 4800 },
    ]
    if (!check) { /////if there is some entries in the revenue table skip seeding
        for (let el of data) {
            await prisma.revenue.create({
                data: {
                    month: el.month,
                    revenue: el.revenue
                }
            })
        }
    }else{
        return null
    }
}