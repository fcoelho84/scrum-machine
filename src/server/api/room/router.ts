import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { find } from './service'

export const RoomFindInput = z.object({ roomId: z.string() })

export const RoomFindOutput = z.object({
  slot: z.object({
    options: z.array(z.string()),
    optionsRaw: z.array(z.string()),
  }),
  users: z.array(
    z.object({ name: z.string(), point: z.number(), isAdmin: z.boolean() })
  ),
})

export default createTRPCRouter({
  find: publicProcedure
    .input(RoomFindInput)
    .output(RoomFindOutput)
    .query(({ input }) => find(input)),
})
