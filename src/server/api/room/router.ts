import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { create, find, join, update } from './service'

import { PollSchema } from 'party/types'
import { z } from 'zod'
import { CreateRoomSchema, JoinRoomSchema, NewUserSchema } from './types'

export default createTRPCRouter({
  createRoom: publicProcedure
    .input(CreateRoomSchema)
    .output(NewUserSchema)
    .mutation(({ input }) => create(input)),

  joinRoom: publicProcedure
    .input(JoinRoomSchema)
    .output(NewUserSchema)
    .mutation(({ input }) => join(input)),
  updateRoom: publicProcedure
    .input(PollSchema)
    .output(PollSchema)
    .mutation(({ input }) => update(input)),
  fetchRoom: publicProcedure
    .input(z.string())
    .output(PollSchema)
    .query(({ input }) => find(input)),
})
