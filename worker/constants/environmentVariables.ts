import dotenv from "dotenv";
import { __DEV__ } from "../utils/assertions";

function getEnvironmentVariables() {
  dotenv.config();
  const { REDIS_HOST, REDIS_PORT } = process.env;

  const environmentVariables = {
    redis: {
      HOST: REDIS_HOST,
      PORT: REDIS_PORT,
    },
  };

  Object.entries(environmentVariables).forEach(([key, value]) => {
    if (!value) {
      const errorMessage = `Environment variable ${key} is not defined.`;
      if (__DEV__) throw new Error(errorMessage);
      else console.warn(errorMessage);
    }
  });

  return environmentVariables;
}

export default getEnvironmentVariables();
