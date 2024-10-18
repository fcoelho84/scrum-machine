import { env } from '~/env'
import { type RoomSchema, type Room } from 'party/types'
import { v4 } from 'uuid'
import { z, ZodError } from 'zod'
import { type VoteSchema, type CreateRoomSchema } from './types'
import { removeShuffleIcons, shuffleSlotValues } from '~/utils/slot'
import Error from 'next/error'

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

export const update = async (
  room: z.infer<typeof RoomSchema>
): Promise<Room> => {
  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${room.id}`, {
    method: 'POST',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const vote = async (params: z.infer<typeof VoteSchema>) => {
  const state = await find(params.roomId)

  const validation = z
    .enum(removeShuffleIcons(state.slot.values) as [string])
    .parse(params.vote)

  if (!validation) return validation

  return fetch(`${env.NEXT_PUBLIC_PARTYKIT_URL}/party/${params.roomId}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
