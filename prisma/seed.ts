// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ------------------------------
  // Seed Customers
  // ------------------------------
  const customer1 = await prisma.customers.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      image_url: "https://example.com/john.png",
    },
  });

  const customer2 = await prisma.customers.create({
    data: {
      name: "Alice Smith",
      email: "alice@example.com",
      image_url: "https://example.com/alice.png",
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
    ],
  });

  // ------------------------------
  // Seed Users
  // ------------------------------
  const user1 = await prisma.users.create({
    data: {
      name: "Michael CEO",
      email: "michael@example.com",
      password: "hashedpassword1",
      lft: 1,
      rgt: 2,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      name: "Sarah Developer",
      email: "sarah@example.com",
      password: "hashedpassword2",
      lft: 3,
      rgt: 4,
    },
  });

  // ------------------------------
  // Seed Tasks
  // ------------------------------
  await prisma.tasks.create({
    data: {
      title: "Prepare quarterly report",
      column: "todo",
      owner_id: user1.id,
      executors: {
        connect: [{ id: user2.id }],
      },
    },
  });

  await prisma.tasks.create({
    data: {
      title: "Update UI components",
      column: "in-progress",
      owner_id: user2.id,
      executors: {
        connect: [{ id: user1.id }],
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
