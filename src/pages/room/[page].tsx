import { useParams } from 'next/navigation'
import { type Room } from 'party/types'
import { useEffect, useState } from 'react'

import { useSocket } from '~/hooks/useSocket'
import { api } from '~/utils/api'
import { socket as socketInstance } from '~/pages'
import { useRouter } from 'next/router'

import Options from '~/components/Options'
import SlotMachine from '~/components/SlotMachine'
import Jackpot from '~/components/Jackpot'
import RoomConfigDrawer from '~/components/RoomConfigDrawer'
import { useConfigContext } from '~/components/RoomConfigDrawer/context'
import Controls from '~/components/Controls'

const Room = () => {
  const params = useParams<{ page: string }>()
  const [room, onMessage] = useState<Room>()
  const config = useConfigContext()
  const router = useRouter()
  const response = api.room.fetchRoom.useQuery(params?.page ?? '', {
    enabled: Boolean(params?.page) && !Boolean(room),
  })
  useSocket({ onMessage })

  useEffect(() => {
    if (socketInstance || !params) return
    router.push(window.location.origin + `?roomId=${params.page}`)
  }, [params, router])

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
      <RoomConfigDrawer />
      <Jackpot {...room} />
      <SlotMachine>
        <SlotMachine.Slot {...room} />
      </SlotMachine>
      <Options {...room} />
      <Controls {...room} />
    </div>
  )
}

export default Room
