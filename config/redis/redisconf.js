
import IORedis from "ioredis";
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const redisConfig = {
  port: REDIS_PORT,
  host: `${REDIS_HOST}`,
  maxRetriesPerRequest: null,
};

export const redisClient = new IORedis(redisConfig);
