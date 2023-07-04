import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  console.log("SEED IS RUNNING");
  await createUser("123akis", "phanakishajittofi@gmail.com", "hyrule123#");
  process.exit(0);
}

async function createUser(username, email, password) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: await bcrypt.hash(password, 8),
    },
  });
  console.log("USER CREATED ", user);
  return user;
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
