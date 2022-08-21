import { createClient } from "redis";
import { environmentVariables } from "./constants";
import { fib, isNumber, __DEV__ } from "./utils";

const redisClient = createClient({
  url: `redis://${environmentVariables.redis.HOST}:${environmentVariables.redis.PORT}`,
});

const subscriber = redisClient.duplicate();

subscriber
  .connect()
  .then(() => {
    subscriber.on("message", async (channel, message) => {
      try {
        if (!isNumber(message)) {
          if (__DEV__) throw new Error(`Message ${message} is not a number`);
          else return console.error(`Message ${message} is not a number`);
        }
        await redisClient.connect();
        await redisClient.hSet("values", message, fib(+message));
        await redisClient.disconnect();
      } catch (error) {
        console.error(error);
      }
    });

    subscriber.subscribe("insert", (value) => {
      console.log(
        `Subscriber received message ${value} from publisher on channel insert`
      );
      subscriber.emit("message", "insert", value);
    });
  })
  .catch(console.error);
