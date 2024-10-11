import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { create, find, update } from './service'

import { RoomSchema } from 'party/types'
import { z } from 'zod'
import { CreateRoomSchema, OutputSchema } from './types'

export default createTRPCRouter({
  createRoom: publicProcedure
    .input(CreateRoomSchema)
    .output(OutputSchema)
    .mutation(({ input }) => create(input)),
  updateRoom: publicProcedure
    .input(RoomSchema)
    .output(RoomSchema)
    .mutation(({ input }) => update(input)),
  fetchRoom: publicProcedure
    .input(z.string())
    .output(z.any())
    .query(({ input }) => find(input)),
})
