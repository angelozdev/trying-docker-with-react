import dotenv from "dotenv";
import { __DEV__ } from "../utils/assertions";

function checkEnvironmentVariable(
  environmentVariables: Record<string, string | object>
) {
  Object.entries(environmentVariables).forEach(([key, value]) => {
    if (typeof value === "object")
      return checkEnvironmentVariable(value as Record<string, string | object>);
    if (!value) {
      const errorMessage = `Environment variable ${key} is not defined.`;
      if (__DEV__) throw new Error(errorMessage);
      else console.warn(errorMessage);
    }
    console.log(`Environment variable ${key} was defined successfully.`);
  });
}

function getEnvironmentVariables() {
  dotenv.config();
  const {
    REDIS_HOST,
    REDIS_PORT,
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
  } = process.env;

  const environmentVariables = {
    redis: {
      HOST: REDIS_HOST!,
      PORT: REDIS_PORT!,
    },
    postgres: {
      USER: POSTGRES_USER!,
      HOST: POSTGRES_HOST!,
      PASSWORD: POSTGRES_PASSWORD!,
      DATABASE: POSTGRES_DATABASE!,
    },
  };

  checkEnvironmentVariable(environmentVariables);

  return environmentVariables;
}

export default getEnvironmentVariables();
