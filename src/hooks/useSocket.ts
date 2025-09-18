import { unpack } from 'msgpackr/unpack'
import { pack } from 'msgpackr/pack'
import { type Room, type MessageTypes, type MessageData } from 'party/types'
import { useCallback } from 'react'

import { create } from 'zustand'
import PartySocket from 'partysocket'
import { env } from '~/env'

type State = {
  message: Room | null
  socket: PartySocket | null
  setMessage: (message: Room) => void
  setSocket: (socket: PartySocket) => void
}

const useSocketInstance = create<State>((set) => ({
  socket: null,
  message: null,
  setSocket: (socket) => set({ socket }),
  setMessage: (message) => set({ message }),
}))

export const useInitSocket = () => {
  const socket = useSocketInstance((state) => state.socket)
  const setMessage = useSocketInstance((state) => state.setMessage)
  const setSocket = useSocketInstance((state) => state.setSocket)

  const onMessage = useCallback(
    async (message: MessageEvent) => {
      const parsedMessage = await message.data.arrayBuffer()
      const unpackMessage = unpack(parsedMessage)
      setMessage(unpackMessage)
    },
    [setMessage]
  )

  const initSocket = useCallback(
    (name: string, room: string) => {
      if (socket) return socket

      const connection = new PartySocket({
        query: {
          name,
        },
        host: env.NEXT_PUBLIC_PARTYKIT_URL,
        room,
      })
      connection.addEventListener('message', onMessage)
      connection.onclose = () => {
        connection.removeEventListener('message', onMessage)
      }

      setSocket(connection)
      return connection
    },
    [onMessage, setSocket, socket]
  )

  return useCallback(
    (room: string, name: string) => {
      return new Promise<PartySocket>((resolve) => {
        resolve(initSocket(name, room))
      })
    },
    [initSocket]
  )
}

export const useSocketCurrentUser = () => {
  const socket = useSocketInstance((state) => state.socket)
  const message = useSocketInstance((state) => state.message)
  return message?.users.find((user) => user.id === socket?.id) ?? null
}

export const useSocketMessage = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector: (message: Room | null) => any
): T | null => {
  return useSocketInstance((state) => selector(state.message))
}

export const useSocketSendMessage = () => {
  const socket = useSocketInstance((state) => state.socket)

  return (type: MessageTypes, data: Omit<MessageData, 'id'>) => {
    socket?.send(
      pack({
        type,
        data: {
          ...data,
          id: socket?.id,
        },
      })
    )
  }
}
