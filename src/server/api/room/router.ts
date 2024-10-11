import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { create, find, join, update } from './service'

import { RoomSchema } from 'party/types'
import { z } from 'zod'
import { CreateRoomSchema, JoinRoomSchema, OutputSchema } from './types'

export default createTRPCRouter({
  createRoom: publicProcedure
    .input(CreateRoomSchema)
    .output(OutputSchema)
    .mutation(({ input }) => create(input)),
  joinRoom: publicProcedure
    .input(JoinRoomSchema)
    .output(OutputSchema)
    .mutation(({ input }) => join(input)),
  updateRoom: publicProcedure
    .input(RoomSchema)
    .output(RoomSchema)
    .mutation(({ input }) => update(input)),
  fetchRoom: publicProcedure
    .input(z.string())
    .output(z.any())
    .query(({ input }) => find(input)),
})
