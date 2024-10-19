import { useParams } from 'next/navigation'
import { type Room } from 'party/types'
import { useEffect, useMemo, useState } from 'react'
import Config from '~/Components/Config'
import JackpotLogo from '~/Components/Jackpot'
import Options from '~/Components/Options'
import SlotMachine from '~/Components/SlotMachine'
import { useSocket } from '~/hooks/useSocket'
import { api } from '~/utils/api'

const Room = () => {
  const params = useParams<{ page: string }>()
  const roomId = useMemo(() => {
    if (!params) return ''
    return params.page
  }, [params])
  const [room, onMessage] = useState<Room>()
  const response = api.room.fetchRoom.useQuery(roomId, {
    enabled: roomId !== '' && !Boolean(room),
  })
  useSocket({ onMessage })

  useEffect(() => {
    if (!room && response.data) onMessage(response.data)
  }, [response, room])

  if (!room) {
    return <></>
  }

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-6 bg-primary p-6">
      <Config />
      <JackpotLogo {...room} />
      <SlotMachine {...room} />
      <Options {...room.slot} />
    </div>
  )
}

export default Room
