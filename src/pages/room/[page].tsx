import { useParams } from 'next/navigation'
import { type Room } from 'party/types'
import { useEffect, useMemo, useState } from 'react'
import Config from '~/Components/Config'
import { useConfigContext } from '~/Components/Config/context'
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
  const config = useConfigContext()
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
    <div
      data-theme={config.theme}
      className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-6 p-6"
    >
      <Config />
      <JackpotLogo {...room} />
      <SlotMachine>
        <SlotMachine.Slot {...room} />
      </SlotMachine>
      <Options {...room} />
    </div>
  )
}

export default Room
