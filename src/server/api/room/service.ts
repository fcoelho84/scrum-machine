import { env } from '~/env'
import { type Room } from 'party/types'
import { v4 } from 'uuid'
import { type z } from 'zod'
import { type JoinRoomSchema, type CreateRoomSchema } from './types'
import { ramdomNumber } from '~/utils/numbers'
import { shuffleSlotValues } from '~/utils/slot'

export const find = async (roomId: string): Promise<Room> => {
  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${roomId}`, {
    method: 'GET',
    next: {
      revalidate: 0,
    },
  }).then((response) => response.json())
}

export const join = async (params: z.infer<typeof JoinRoomSchema>) => {
  const room = await find(params.roomId)

  const userId = v4()

  room.users.push({
    state: 'idle',
    name: params.userName,
    point: '0',
    id: userId,
  })

  await update(room)

  return { roomId: params.roomId, userId }
}

export const create = async (params: z.infer<typeof CreateRoomSchema>) => {
  const id = v4()
  const user = {
    name: params.userName,
    point: '0',
    id: v4(),
  }

  const body = JSON.stringify({
    id,
    users: [user],
    slot: {
      state: 'waiting',
      values: shuffleSlotValues(params.slotValues),
    },
  })

  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${id}`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => ({ roomId: id, userId: user.id }))
}

export const update = async (room: Room): Promise<Room> => {
  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${room.id}`, {
    method: 'POST',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
