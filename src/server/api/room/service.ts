import {
  createClient,
  type RedisClientType,
  type RedisFunctions,
  type RedisModules,
  type RedisScripts,
} from '@redis/client'
import { v4 as uuid } from 'uuid'
import { type Room, type CreateRoomParams, type UpdateParams } from './types'
import { TRPCError } from '@trpc/server'

export const find = async (roomId: string): Promise<Room> => {
  const data = await redis((client) => client.get(roomId))

  if (!data) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Room not found.',
    })
  }

  return JSON.parse(data)
}

export const update = async (params: UpdateParams): Promise<Room> => {
  const room = await find(params.roomId)

  room.users.push({ ...params.user, id: uuid() })

  await redis((client) => client.set(room.id, JSON.stringify(room)))

  return room
}

export const create = async (user: CreateRoomParams): Promise<Room> => {
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
