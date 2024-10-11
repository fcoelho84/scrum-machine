import { unpack } from 'msgpackr/unpack'
import { useRouter } from 'next/router'
import { type Room, type ParsedMessage } from 'party/types'
import { useEffect, useMemo } from 'react'
import { socket } from '~/pages'

type UsePartySocketOptions = {
  onMessage?: (event: Room) => void
}

export const useSocket = (options?: UsePartySocketOptions) => {
  const router = useRouter()
  const roomId = useMemo(
    () => router.query?.page as string | undefined,
    [router.query?.page]
  )

  useEffect(() => {
    if (!socket) return
    const fn = async (message: MessageEvent) => {
      const parsedMessage = await message.data.arrayBuffer()
      const unpackMessage = unpack(parsedMessage)
      options?.onMessage && options?.onMessage(unpackMessage)
    }
    socket.addEventListener('message', fn)
    return () => {
      socket.removeEventListener('message', fn)
    }
  }, [roomId, options])

  return useMemo(
    () => ({
      send(data: ParsedMessage) {
        socket?.send(JSON.stringify(data))
      },
    }),
    []
  )
}
