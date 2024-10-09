import { useRouter } from 'next/router'
import { type Room, type ParsedMessage } from 'party/types'
import usePartySocket from 'partysocket/react'
import { useEffect, useMemo } from 'react'
import { env } from '~/env'
import { useUser } from './useUser'

type UsePartySocketOptions = {
  onOpen?: (event: WebSocketEventMap['open']) => void
  onMessage?: (event: Room) => void
  onClose?: (event: WebSocketEventMap['close']) => void
  onError?: (event: WebSocketEventMap['error']) => void
}

export const useSocket = (options?: UsePartySocketOptions) => {
  const router = useRouter()
  const roomId = useMemo(
    () => router.query?.page as string | undefined,
    [router.query?.page]
  )
  const socket = usePartySocket({
    startClosed: true,
    ...options,
    onMessage(message) {
      const parsedData = JSON.parse(message.data) as Room
      options?.onMessage && options.onMessage(parsedData)
    },
    onError(e) {
      console.error(e)
    },
  })

  useEffect(() => {
    if (!roomId) return
    socket.updateProperties({
      host: env.NEXT_PUBLIC_PARTYKIT_URL,
      room: roomId,
    })
    socket.reconnect()
  }, [socket, roomId])

  return useMemo(
    () => ({
      ...socket,
      send(data: ParsedMessage) {
        socket.send(JSON.stringify(data))
      },
    }),
    [socket]
  )
}
