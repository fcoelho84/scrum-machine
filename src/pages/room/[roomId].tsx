import { useParams } from 'next/navigation'
import { type Room } from 'party/types'
import { useMemo } from 'react'

import { useSocketMessage } from '~/hooks/useSocket'

import SlotMachine from '~/components/SlotMachine'
import { mostRepeatedNumber } from '~/utils/numbers'
import BackgroundPage from '~/components/BackgroundPage'
import Options from '~/components/Options'
import Controls from '~/components/Controls'

const Room = () => {
  const params = useParams()
  const users = useSocketMessage<Room['users']>((state) => state?.users)

  const nonSpectators = useMemo(
    () => users?.filter((user) => user.state !== 'spectator') ?? [],
    [users]
  )

  const repeatedNumber = useMemo(() => {
    if (nonSpectators.find((user) => user.state === 'idle')) return '🤔'

    return mostRepeatedNumber(nonSpectators.map((user) => user.point))
  }, [nonSpectators])

  if (!params?.roomId) {
    return <></>
  }

  return (
    <BackgroundPage>
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4 sm:gap-6 sm:p-6">
        <span className="text-center text-4xl sm:text-6xl">
          {repeatedNumber ?? '🤔'}
        </span>

        <SlotMachine />

        <Options />
        <Controls />
      </div>
    </BackgroundPage>
  )
}

export default Room
