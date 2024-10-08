import { useRouter } from 'next/router'
import { type Poll } from 'party/types'
import usePartySocket from 'partysocket/react'
import { useEffect, useMemo } from 'react'

type UsePartySocketOptions = {
  onOpen?: (event: WebSocketEventMap['open']) => void
  onMessage?: (event: Poll) => void
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
      const poll = JSON.parse(message.data) as Poll
      options?.onMessage && options.onMessage(poll)
    },
    onError(e) {
      console.error(e)
    },
  })

  useEffect(() => {
    if (!roomId) return
    socket.updateProperties({
      host: 'http://localhost:1999',
      room: roomId,
    })
    socket.reconnect()
  }, [socket, roomId])

  return socket
}
