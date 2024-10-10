import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import {} from 'party/types'
import { LegacyRef, useMemo, useRef, useState } from 'react'
import Modal from '~/Components/Modal'
import SlotMachine from '~/Components/SlotMachine'
import { useToggleable } from '~/hooks/useToggleable'
import { useUser } from '~/hooks/useUser'
import { api } from '~/utils/api'
import { shuffleSlotValues } from '~/utils/slot'

export default function Home() {
  const router = useRouter()
  const joinRoom = api.room.joinRoom.useMutation()
  const createRoom = api.room.createRoom.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])
  const [_, setUserId] = useUser()
  const [open, toggleOpen] = useToggleable()
  const [userName, setName] = useState('')

  const createAndJoin = async () => {
    const response = await createRoom.mutateAsync({ userName })
    setUserId(response.userId)
    router.push('/room/' + response.roomId)
  }

  const join = async () => {
    if (!roomId) return
    const response = await joinRoom.mutateAsync({ userName, roomId })
    setUserId(response.userId)
    router.push('/room/' + roomId)
  }

  const handle = () => {
    if (roomId) join()
    else createAndJoin()
  }

  return (
    <div className="relative h-[100vh] max-h-[100vh] overflow-hidden">
      <div className="absolute h-[100vh] max-h-[100vh] w-full rotate-6">
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-[rotate_16s_infinite_linear] rounded-[36%] bg-secondary opacity-5" />
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-[rotate_16s_infinite_linear] rounded-[37%] bg-secondary opacity-5" />

        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-[rotate_10s_infinite_linear] rounded-[46%] bg-secondary opacity-5" />
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-[rotate_10s_infinite_linear] rounded-[57%] bg-secondary opacity-5" />

        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-[rotate_12s_infinite_linear] rounded-[56%] bg-secondary opacity-5" />
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-[rotate_12s_infinite_linear] rounded-[67%] bg-secondary opacity-5" />
      </div>
      <Modal open={open}>
        <div className="m-6 flex h-[320px] w-[420px] flex-col items-center justify-center gap-4">
          <input
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="escolha um nome"
            id="input-ref"
          />
          <button
            className="mb-2 w-full max-w-[300px] text-[1rem]"
            disabled={userName.length < 3}
            onClick={handle}
          >
            Entrar
          </button>
        </div>
      </Modal>

      <div className="relative ml-[92px] mt-[148px] flex max-w-[500px] flex-col items-center max-sm:ml-0 max-sm:mt-[120px]">
        <h1 className="mb-[150px] block text-center text-8xl text-highlight max-sm:text-6xl ">
          <span className="flicker-fast">scr</span>
          <span>um mach</span>
          <span className="flicker-fast">ine</span>
        </h1>
        <button
          disabled={!roomId}
          className="mb-2 w-full max-w-[300px] text-[1rem]"
          onClick={toggleOpen}
        >
          Entrar
        </button>
        <button
          data-type="text"
          className="max-w-[300px] text-[1rem]"
          onClick={toggleOpen}
        >
          Criar sala
        </button>
      </div>
    </div>
  )
}
