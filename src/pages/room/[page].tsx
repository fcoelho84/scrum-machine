import { type Poll } from 'party/types'
import { useState } from 'react'
import JackpotLogo from '~/Components/Jackpot'
import Options from '~/Components/Options'
import SlotMachine from '~/Components/SlotMachine'
import { useSocket } from '~/hooks/useSocket'

const Room = () => {
  const [poll, setPoll] = useState<Poll>()

  useSocket({
    onMessage(poll) {
      setPoll(poll)
    },
  })

  if (!poll) return <></>

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-6 bg-primary p-6">
      <JackpotLogo {...poll} />
      <SlotMachine {...poll} />
      <Options {...poll} />
    </div>
  )
}

export default Room
