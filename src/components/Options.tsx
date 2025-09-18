import { MessageTypes, type Room } from 'party/types'
import { useEffect, useState } from 'react'
import { removeShuffleIcons } from '~/utils/slot'
import { useVotes } from '~/hooks/useVotes'
import { useSocketMessage, useSocketSendMessage } from '~/hooks/useSocket'

const Options = () => {
  const [point, setPoint] = useState('')
  const sendMessage = useSocketSendMessage()
  const users = useSocketMessage<Room['users']>((state) => state?.users)
  const slot = useSocketMessage<Room['slot']>((state) => state?.slot)
  const votes = useVotes(users ?? [])

  useEffect(() => {
    if (slot?.shouldSpin) setPoint('')
  }, [slot])

  const updateUserState = (value: string) => {
    if (value === point) return
    setPoint(value)
    sendMessage(MessageTypes.userUpdate, {
      state: 'voted',
      point: value,
    })
  }

  const onClick = (value: string) => async () => {
    updateUserState(value)
  }

  return (
    <div className="z-10 w-full overflow-hidden">
      <div className="flex gap-2 overflow-x-auto md:justify-center">
        {removeShuffleIcons(slot?.values ?? []).map((item, key) => (
          <button
            data-active={point === item}
            className="btn btn-accent w-[64px] data-[active=true]:brightness-50"
            key={key}
            onClick={onClick(item)}
            disabled={slot?.shouldSpin ?? votes.isIdle}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
