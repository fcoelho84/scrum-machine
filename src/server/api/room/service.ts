import { env } from '~/env'
import { type Poll } from 'party/types'
import { v4 } from 'uuid'
import { type z } from 'zod'
import { type JoinRoomSchema, type CreateRoomSchema } from './types'

export const find = async (roomId: string): Promise<Poll> => {
  const req = await fetch(`${env.PARTYKIT_URL}/party/${roomId}`, {
    method: 'GET',
    next: {
      revalidate: 0,
    },
  })

  if (!req.ok) {
    throw new Error('Something went wrong.')
  }

  return req.json()
}

export const join = async (params: z.infer<typeof JoinRoomSchema>) => {
  const room = await find(params.roomId)

  const user = {
    name: params.userName,
    point: '0',
    id: v4(),
  }

  room.users.push(user)

  await update(room)

  return {
    user,
    id: params.roomId,
  }
}

export const create = async (params: z.infer<typeof CreateRoomSchema>) => {
  const id = v4()
  const user = {
    name: params.userName,
    point: '0',
    id: v4(),
  }
  const req = await fetch(`${env.PARTYKIT_URL}/party/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      users: [user],
      slot: {
        state: 'waiting',
        values: params.slotValues ?? [
          '0',
          ' 0.5',
          '1',
          '2',
          '3',
          '5',
          '8',
          '13',
        ],
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!req.ok) {
    throw new Error('Something went wrong.')
  }

  return {
    user,
    id,
  }
}

export const update = async (poll: Poll): Promise<Poll> => {
  const req = await fetch(`${env.PARTYKIT_URL}/party/${poll.id}`, {
    method: 'POST',
    body: JSON.stringify(poll),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!req.ok) {
    throw new Error('Something went wrong.')
  }

  return req.json()
}
