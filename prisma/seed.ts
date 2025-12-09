// prisma/seed.ts
import { PrismaClient } from 'prisma/generated/prisma/client';
import bcrypt from "bcrypt";


import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })






// const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ------------------------------
  // Seed Customers
  // ------------------------------
  const customer1 = await prisma.customers.create({
    data: {
      name: "Evil Rabbit",
      email: "evil@mail.com",
      image_url: "/customers/evil-rabbit.png",
    },
  });

  const customer2 = await prisma.customers.create({
    data: {
      name: 'Delba de Oliveira',
      email: 'delba@oliveira.com',
      image_url: '/customers/delba-de-oliveira.png',
    },
  });
  const customer3 = await prisma.customers.create({
    data: {
      name: 'Michael Novotny',
      email: 'michael@novotny.com',
      image_url: '/customers/michael-novotny.png',
    },
  });
  const customer4 = await prisma.customers.create({
    data: {
      name: 'Amy Burns',
      email: 'amy@burns.com',
      image_url: '/customers/amy-burns.png',
    },
  });
  const customer5 = await prisma.customers.create({
    data: {
      name: 'Balazs Orban',
      email: 'balazs@orban.com',
      image_url: '/customers/balazs-orban.png',
    },
  });


  // ------------------------------
  // Seed Invoices
  // ------------------------------
  await prisma.invoices.createMany({
    data: [
      {
        customer_id: customer1.id,
        amount: 350,
        status: "pending",
        date: new Date("2024-01-10"),
      },
      {
        customer_id: customer2.id,
        amount: 800,
        status: "paid",
        date: new Date("2024-02-05"),
      },
      {
        customer_id: customer3.id,
        amount: 20348,
        status: 'pending',
        date: new Date('2022-11-14'),
      },
      {
        customer_id: customer2.id,
        amount: 44800,
        status: 'paid',
        date: new Date('2023-09-10'),
      },
      {
        customer_id: customer2.id,
        amount: 54246,
        status: 'pending',
        date: new Date('2023-07-16'),
      },
      {
        customer_id: customer3.id,
        amount: 32545,
        status: 'paid',
        date: new Date('2023-06-09'),
      },
      {
        customer_id: customer4.id,
        amount: 1250,
        status: 'paid',
        date: new Date('2023-06-17'),
      },
      {
        customer_id: customer5.id,
        amount: 8546,
        status: 'paid',
        date: new Date('2023-06-07'),
      },
      {
        customer_id: customer1.id,
        amount: 500,
        status: 'paid',
        date: new Date('2023-08-19'),
      },
      {
        customer_id: customer5.id,
        amount: 8945,
        status: 'paid',
        date: new Date('2023-06-03'),
      },
      {
        customer_id: customer2.id,
        amount: 1000,
        status: 'paid',
        date: new Date('2022-06-05'),
      },
    ],
  });

  // ------------------------------
  // Seed Users
  // ------------------------------
  const asdasdHashed = await bcrypt.hash('asdasd', 10);

  const admin = await prisma.role.create({
    data: {
      name: "Admin",
      level: 1,
    },
  })

  const manager = await prisma.role.create({
    data: {
      name: "Manager",
      level: 2,
      parentId: admin.id,
    },
  })

  const employee = await prisma.role.create({
    data: {
      name: "Employee",
      level: 3,
      parentId: manager.id,
    },
  });
  const user1 = await prisma.users.create({
    data: {
      name: "Dourtchev CEO",
      email: "ceo@mail.com",
      password: asdasdHashed,
      roleId: admin.id,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      name: "Stas",
      email: "rnd@mail.com",
      password: asdasdHashed,
      roleId: manager.id,
    },
  });
  const user3 = await prisma.users.create({
    data: {
      name: "Simeon",
      email: "dev@mail.com",
      password: asdasdHashed,
      roleId: employee.id,
    },
  });

  // ------------------------------
  // Seed revenue 
  // ------------------------------
  const revenue = await prisma.revenue.createMany({
    data: [
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
  })
  // ------------------------------
  // Seed Columns
  // ------------------------------
  const column1 = await prisma.column.create({
    data: {
      name: 'backlog',
    }
  })
  const column2 = await prisma.column.create({
    data: {
      name: 'todo',
    }
  })
  const column3 = await prisma.column.create({
    data: {
      name: 'in-progress',
    }
  })
  const column4 = await prisma.column.create({
    data: {
      name: 'done'
    }
  })
  // ------------------------------
  // Seed Tasks
  // ------------------------------
  await prisma.tasks.create({
    data: {
      title: "Prepare quarterly report",
      columnId: column1.id,
      owner_id: user1.id,
      executors: {
        connect: [{ id: user2.id }],
      },
    },
  });
  await prisma.tasks.create({
    data: {
      title: "Work",
      columnId: column2.id,
      owner_id: user2.id,
      executors: {
        connect: [{ id: user3.id }],
      },
    },
  });
  await prisma.tasks.create({
    data: {
      title: "Brew coffee",
      columnId: column3.id,
      owner_id: user2.id,
      executors: {
        connect: [{ id: user3.id }],
      },
    },
  });

  await prisma.tasks.create({
    data: {
      title: "Update UI components",
      columnId: column4.id,
      owner_id: user2.id,
      executors: {
        connect: [{ id: user3.id }],
      },
    },
  });

  console.log("🌱 Seeding completed!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

