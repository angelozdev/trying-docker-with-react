import express from "express";
import morgan from "morgan";
import cors from "cors";

import sql from "./db/postgres";
import redisClient, { redisPublisher } from "./db/redis";
import { isNumber } from "./utils/assertions";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/values/all", async (req, res) => {
  try {
    const values = await sql`
      SELECT * FROM values;
    `;

    res.json({ values }).status(200);
  } catch (error) {
    res.json({ error }).status(500);
  }
});

app.get("/values/current", async (req, res) => {
  try {
    await redisClient.connect();
    const currentValues = await redisClient.hGetAll("values");
    res.json({ currentValues }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ error }).status(500);
  } finally {
    await redisClient.disconnect();
  }
});

app.post("/values", async (req, res) => {
  const index = String(req.body.index);
  if (!isNumber(index)) return res.status(422).send("Index must be a number");
  if (+index < 0) return res.status(422).send("Index must be positive");
  if (+index > 100) return res.status(422).send("Index is too big. Max is 100");

  try {
    await redisClient.connect();
    await redisClient.hSet("values", index, "Nothing yet!");
    await redisPublisher.connect();
    await redisPublisher.publish("insert", index);
    await sql`
      INSERT INTO values (number) VALUES (${index});
    `;

    res.status(201).send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  } finally {
    await redisClient.disconnect();
    await redisPublisher.disconnect();
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
