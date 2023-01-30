import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.user.deleteMany();

  await prismaClient.user.create({
    data: {
      name: "Master",
      short_name: "Master",
      email: "master@onnetmais.com.br",
      password: await hash("devA1D2M3", 8),
      admin: true,
    },
  });
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prismaClient.$disconnect();
    process.exit(1);
  });
