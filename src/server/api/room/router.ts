import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { create, find, update } from './service'
import {
  CreateRoomSchema,
  FindRoomSchema,
  RoomSchema,
  UpdateSchema,
} from './types'

export default createTRPCRouter({
  update: publicProcedure
    .input(UpdateSchema)
    .output(RoomSchema)
    .mutation(({ input }) => update(input)),
  create: publicProcedure
    .input(CreateRoomSchema)
    .output(RoomSchema)
    .mutation(({ input }) => create(input)),
  find: publicProcedure
    .input(FindRoomSchema)
    .output(RoomSchema)
    .query(({ input }) => find(input.roomId)),
})
