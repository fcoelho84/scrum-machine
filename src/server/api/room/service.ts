import { env } from '~/env'
import { type Room } from 'party/types'
import { v4 } from 'uuid'
import { type z } from 'zod'
import { type CreateRoomSchema } from './types'
import { shuffleSlotValues } from '~/utils/slot'

export const find = async (roomId: string): Promise<Room> => {
  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${roomId}`, {
    method: 'GET',
    next: {
      revalidate: 0,
    },
  }).then((response) => response.json())
}

export const create = async (params: z.infer<typeof CreateRoomSchema>) => {
  const body = {
    id: v4(),
    users: [],
    slot: {
      state: 'waiting',
      values: shuffleSlotValues(params.slotValues),
    },
  }

  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${body.id}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => ({ roomId: body.id }))
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
