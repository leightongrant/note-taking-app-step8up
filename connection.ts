import { createClient } from 'redis'
import '@dotenvx/dotenvx/config'

export const redis = await createClient({
  url: process.env.REDIS_URL,
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
