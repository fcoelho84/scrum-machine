import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { create, find, update, vote } from './service'

import { RoomSchema } from 'party/types'
import { z } from 'zod'
import { CreateRoomSchema, OutputSchema, VoteSchema } from './types'

export default createTRPCRouter({
  vote: publicProcedure.input(VoteSchema).mutation(({ input }) => vote(input)),
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
