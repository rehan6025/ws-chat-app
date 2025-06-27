import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

// const pg = new Client(
//   "postgresql://neondb_owner:npg_f2BsjLc5WtZk@ep-polished-river-a8tubr59-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
// );

const pgClient2 = new Client({
  user: "neondb_owner",
  password: "npg_f2BsjLc5WtZk",
  port: 5432,
  host: "ep-polished-river-a8tubr59-pooler.eastus2.azure.neon.tech",
  database: "neondb",
  ssl: { rejectUnauthorized: false },
});
pgClient2.connect();

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const insertQuery = `INSERT INTO users (username , email, password) VALUES ($1,$2,$3);`;

    const response = await pgClient2.query(insertQuery, [
      username,
      email,
      password,
    ]);

    res.json({
      message: "You have signed up",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "An error occurred while signing up",
    });
  }
});

app.listen(3000);
