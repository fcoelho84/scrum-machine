import room from '~/server/api/room/router'
import { createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
  room,
})

export type AppRouter = typeof appRouter
