import postgres from "postgres";
import { environmentVariables } from "../constants";

const sql = postgres({
  user: environmentVariables.postgres.USER,
  host: environmentVariables.postgres.HOST,
  database: environmentVariables.postgres.DATABASE,
  password: environmentVariables.postgres.PASSWORD,
});

sql`
  CREATE TABLE IF NOT EXISTS values (id SERIAL PRIMARY KEY, number INT);
`
  .then(() => {
    console.log("Table values created successfully");
  })
  .catch(console.error);

export default sql;
