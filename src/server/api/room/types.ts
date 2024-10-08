import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  point: z.number().nullable(),
  isAdmin: z.boolean(),
})

export const UpdateSchema = z.object({
  roomId: z.string(),
  user: UserSchema.omit({ id: true }).merge(
    z.object({ id: z.string().optional() })
  ),
})

export const CreateRoomSchema = UserSchema.omit({ id: true })

export const FindRoomSchema = z.object({ roomId: z.string() })

export const RoomSchema = z.object({
  id: z.string(),
  slot: z.array(z.string()),
  users: z.array(UserSchema),
})

export type FindRoomParams = z.infer<typeof FindRoomSchema>

export type CreateRoomParams = z.infer<typeof CreateRoomSchema>

export type UpdateParams = z.infer<typeof UpdateSchema>

export type Room = z.infer<typeof RoomSchema>

export type User = z.infer<typeof UserSchema>
