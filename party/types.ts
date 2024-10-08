import { z } from 'zod'

const SlotSchema = z.object({
  values: z.array(z.string()),
  state: z.enum(['waiting', 'spining', 'stopped']),
})

const UserSchma = z.object({
  name: z.string(),
  id: z.string(),
  point: z.string(),
})

export const PollSchema = z.object({
  id: z.string(),
  slot: SlotSchema,
  users: z.array(UserSchma),
})

export type Poll = z.infer<typeof PollSchema>
