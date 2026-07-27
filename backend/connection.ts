import { createClient } from 'redis'
import { config } from '@dotenvx/dotenvx'

config({
  path: '.env.production.local',
})

console.log(process.env.REDIS_URL)

export const redis = await createClient({ url: process.env.REDIS_URL })
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
