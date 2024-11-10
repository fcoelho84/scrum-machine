import { MessageTypes, type Room } from 'party/types'
import { useEffect, useMemo, useState } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { api } from '~/utils/api'
import { removeShuffleIcons } from '~/utils/slot'
import { useVotes } from '~/hooks/useVotes'
import { useConfigContext } from './RoomConfigDrawer/context'

const Options = ({ slot, ...props }: Room) => {
  const [point, setPoint] = useState('')
  const socket = useSocket()
  const { mutateAsync } = api.room.vote.useMutation()
  const config = useConfigContext()
  const votes = useVotes(props.users)

  useEffect(() => {
    if (slot.shouldSpin) {
      setPoint('')
    }
  }, [slot])

  const saveUserVote = async (value: string) => {
    if (!socket.roomId) return
    await mutateAsync({
      id: socket.id,
      vote: value,
      roomId: socket.roomId,
    })
  }

  const updateUserState = (value: string) => {
    socket.send(MessageTypes.userUpdate, {
      state: value === point ? 'waiting' : 'voted',
      id: socket.id,
      point: '🤫',
    })
  }

  const onClick = (value: string) => async () => {
    setPoint((vote) => (vote === value ? '' : value))
    updateUserState(value)
    await saveUserVote(value)
  }

  if (config.isSpectator) return <></>

  return (
    <div className="z-10 w-full overflow-hidden">
      <div className="flex gap-2 overflow-x-auto md:justify-center">
        {removeShuffleIcons(slot?.values ?? []).map((item, key) => (
          <button
            data-active={point === item}
            className="btn btn-accent w-[64px] data-[active=true]:brightness-50"
            key={key}
            onClick={onClick(item)}
            disabled={slot.shouldSpin || votes.isIdle}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
