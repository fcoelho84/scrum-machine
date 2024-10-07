import { ramdomNumber } from '~/utils/numbers'
import {
  createClient,
  type RedisClientType,
  type RedisFunctions,
  type RedisModules,
  type RedisScripts,
} from '@redis/client'
import { v4 as uuid } from 'uuid'
import { type Room, type FindRoomQuery, type CreateRoomQuery } from './types'
import { TRPCError } from '@trpc/server'

export const find = async (query: FindRoomQuery): Promise<Room> => {
  const data = await redis((client) => client.get(query.roomId))

  if (!data) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Room not found.',
    })
  }

  return JSON.parse(data)
}

export const create = async (user: CreateRoomQuery): Promise<Room> => {
  const room = {
    id: uuid(),
    slot: ['0', '0.5', '1', '2', '3', '5', '8', '13'],
    users: [{ ...user, id: uuid() }],
  }

  await redis((client) => client.set(room.id, JSON.stringify(room)))

  return room
}

const redis = async <T = string | null>(
  fnCallback: (
    redis: RedisClientType<RedisModules, RedisFunctions, RedisScripts>
  ) => Promise<T>
) => {
  const redis = await createClient()
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect()

  const response = await fnCallback(redis)
  await redis.disconnect()

  return response
}
