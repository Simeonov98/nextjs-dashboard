import {PrismaClient} from 'prisma/generated/prisma/client'


export default async function seedCustomers(prisma:PrismaClient){
    const data = [
        {name: 'Evil Rabbit', email:'evil@mail.com',image_url:'/customers/evil-rabbit.png'},
        {name: 'Delba de Oliveira', email:'delba@mail.com',image_url:'/customers/delba-de-oliveira.png'},
        {name: 'Michael Novotny', email:'michael@mail.com',image_url:'/customers/michael-novotny.png'},
        {name: 'Amy Burns', email:'amy@mail.com',image_url:'/customers/amy-burns.png'},
        {name: 'Balazs Orban', email:'balazs@mail.com',image_url:'/customers/balazs-orban.png'},
    ]


    for (const customer of data){
        await prisma.customers.upsert({
            where: {
                email:customer.email
            },
            update: customer,
            create: customer,
        })
    }
    return prisma.customers.findMany()
}
