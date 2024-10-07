import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import JackpotLogo from '~/Components/Jackpot'
import Slot from '~/Components/Slot'
import SlotContainer from '~/Components/SlotContainer'
import { api } from '~/utils/api'
import { socket } from '../_app'

const Room = () => {
  const [spin, setSpin] = useState(false)

  const route = useRouter()
  const { data } = api.room.find.useQuery(
    {
      roomId: route.query?.page as string,
    },
    { enabled: Boolean(route.query?.page) }
  )

  useEffect(() => {
    if (!data) return

    socket.emit('join', true)
  }, [data])

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

      <button
        className="z-10 min-w-[185px]"
        onClick={() => {
          setSpin((shouldSpin) => !shouldSpin)
        }}
      >
        {!spin ? 'Girar' : 'Resetar'}
      </button>
    </div>
  )
}

export default Room
