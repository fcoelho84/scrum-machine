import { type Room } from 'party/types'
import { useState } from 'react'
import { FaShare } from 'react-icons/fa'
import JackpotLogo from '~/Components/Jackpot'
import Options from '~/Components/Options'
import SlotMachine from '~/Components/SlotMachine'
import { useSocket } from '~/hooks/useSocket'

const Room = () => {
  const [room, setRoom] = useState<Room>()
  useSocket({
    onMessage(room) {
      setRoom(room)
    },
  })

  const share = () => {
    if (!room || typeof window === undefined) return
    const input = document.createElement('input')
    input.value = window.location.host + `?roomId=${room.id}`
    input.select()
    navigator.clipboard.writeText(input.value)
  }

  if (!room) return <></>

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-6 bg-primary p-6">
      <JackpotLogo users={room.users} />
      <SlotMachine {...room} />
      <Options {...room.slot} />

      <button
        data-type="text"
        className="absolute right-4 top-4"
        onClick={share}
      >
        <FaShare />
      </button>
    </div>
  )
}

export default Room
