import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { create, find } from './service'
import { CreateRoomSchema, FindRoomSchema, RoomSchema } from './types'

export default createTRPCRouter({
  create: publicProcedure
    .input(CreateRoomSchema)
    .output(RoomSchema)
    .mutation(({ input }) => create(input)),
  find: publicProcedure
    .input(FindRoomSchema)
    .output(RoomSchema)
    .query(({ input }) => find(input)),
})
