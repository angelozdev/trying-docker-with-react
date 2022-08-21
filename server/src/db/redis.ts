import { createClient } from "redis";
import { environmentVariables } from "../constants";

const url = `redis://${environmentVariables.redis.HOST}:${environmentVariables.redis.PORT}`;

const redisClient = createClient({
  url,
});

export const redisPublisher = redisClient.duplicate();

export default redisClient;
