import { customers, PrismaClient } from 'prisma/generated/prisma/client'

export default async function seedInvoices(prisma: PrismaClient,customers:customers[]) {
    const data = [
        {  amount: 350, status: "pending", date: new Date("2024-01-10"), },
        {  amount: 800, status: "paid", date: new Date("2024-02-05"), },
        {  amount: 20348, status: 'pending', date: new Date('2022-11-14'), },
        {  amount: 44800, status: 'paid', date: new Date('2023-09-10'), },
        {  amount: 54246, status: 'pending', date: new Date('2023-07-16'), },
        {  amount: 32545, status: 'paid', date: new Date('2023-06-09'), },
        {  amount: 1250, status: 'paid', date: new Date('2023-06-17'), },
        {  amount: 8546, status: 'paid', date: new Date('2023-06-07'), },
        {  amount: 500, status: 'paid', date: new Date('2023-08-19'), },
        {  amount: 8945, status: 'paid', date: new Date('2023-06-03'), },
        {  amount: 1000, status: 'paid', date: new Date('2022-06-05'), },
    ]

    
    for (let i=0; i< data.length; i++){
        const invoice = data[i]
        const customer = customers[i%customers.length]
    
    await prisma.invoices.create({
            data:{
                amount:invoice.amount,
                status:invoice.status,
                date:invoice.date,
                customer:{connect:{id: customer.id}}
            }
        })
    }
}

