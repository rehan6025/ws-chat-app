import express, { Request, Response } from "express";
import { PrismaClient } from "../src/generated/prisma";

const app = express();
const client = new PrismaClient();

app.get("/users", async (req: Request, res: Response) => {
  const users = await client.user.findMany();

  res.json({
    users,
  });
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await client.user.findFirst({
    where: {
      id: id,
    },
    select: {
      todos: true,
    },
  });

  res.json({
    user,
  });
});

app.listen(3000);

async function getUser() {
  const user = await client.user.findFirst({
    where: {
      id: 1,
    },
    include: {
      todos: true,
    },
  });

  console.log(user);
}

getUser();
