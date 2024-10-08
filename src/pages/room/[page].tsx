import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import JackpotLogo from '~/Components/Jackpot'
import Slot from '~/Components/Slot'
import SlotContainer from '~/Components/SlotContainer'
import { useSocket } from '~/hooks/useSocket'
import { api } from '~/utils/api'

const Room = () => {
  const [spin, setSpin] = useState(false)
  const router = useRouter()
  const roomId = useMemo(
    () => router.query?.page as string | undefined,
    [router.query?.page]
  )
  const { data } = api.room.find.useQuery(
    { roomId: roomId! },
    { enabled: Boolean(roomId), refetchOnWindowFocus: false }
  )
  const socket = useSocket({
    onMessage(message) {
      const obj = JSON.parse(message.data)
      setSpin(obj.spin)
      console.log(obj)
    },
  })

  const handleSpin = () => {
    socket.send(JSON.stringify({ spin: !spin }))
  }

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-6 bg-primary p-6">
      <JackpotLogo active={spin} />
      <SlotContainer>
        {(data?.users ?? []).map((key, index) => (
          <Slot
            items={data?.slot ?? []}
            spin={spin}
            index={index}
            key={index}
          />
        ))}
      </SlotContainer>

      <div className="z-10 flex flex-wrap gap-2">
        {(data?.slot ?? []).map((item, key) => (
          <button className="min-w-[76px]" key={key}>
            {item}
          </button>
        ))}
      </div>

      <button className="z-10 min-w-[185px]" onClick={handleSpin}>
        {!spin ? 'Girar' : 'Resetar'}
      </button>
    </div>
  )
}

export default Room
