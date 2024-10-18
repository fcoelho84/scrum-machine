import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import PartySocket from 'partysocket'
import { useEffect, useMemo, useState } from 'react'
import Modal from '~/Components/Modal'
import { env } from '~/env'
import { useToggleable } from '~/hooks/useToggleable'
import { api } from '~/utils/api'

export let socket: PartySocket

export default function Home() {
  const router = useRouter()
  const createRoom = api.room.createRoom.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])
  const [open, toggleOpen, setToggle] = useToggleable()
  const [name, setName] = useState('')

  const createAndJoin = async () => {
    const response = await createRoom.mutateAsync({})

    router.push('/room/' + response.roomId)
    init(response.roomId, name)
  }

  const join = async (roomId: string) => {
    if (!roomId) return
    router.push('/room/' + roomId)
    init(roomId, name)
  }

  const init = (room: string, name: string) => {
    socket = new PartySocket({
      query: {
        name,
      },
      host: env.NEXT_PUBLIC_PARTYKIT_URL,
      room,
    })
  }

  const handle = () => {
    if (roomId) join(roomId)
    else createAndJoin()
  }

  useEffect(() => {
    setToggle(Boolean(roomId))
  }, [roomId, setToggle])

  return (
    <div className="relative h-[100vh] max-h-[100vh] overflow-hidden">
      <div className="absolute h-[100vh] max-h-[100vh] w-full rotate-6">
        <div className="animate-rotate absolute left-[600px] top-0 h-[2300px] w-[3500px] rounded-[36%] bg-secondary opacity-5" />
        <div className="animate-rotate absolute left-[600px] top-0 h-[2300px] w-[3500px] rounded-[37%] bg-secondary opacity-5" />

        <div className="animate-rotate absolute left-[600px] top-0 h-[2300px] w-[3500px] rounded-[46%] bg-secondary opacity-5 duration-[10s]" />
        <div className="animate-rotate absolute left-[600px] top-0 h-[2300px] w-[3500px] rounded-[57%] bg-secondary opacity-5 duration-[10s]" />

        <div className="animate-rotate absolute left-[600px] top-0 h-[2300px] w-[3500px] rounded-[56%] bg-secondary opacity-5 duration-[12s]" />
        <div className="animate-rotate absolute left-[600px] top-0 h-[2300px] w-[3500px] rounded-[67%] bg-secondary opacity-5 duration-[12s]" />
      </div>
      <Modal open={open} onClose={toggleOpen}>
        <div className="m-6 flex h-[320px] w-[420px] flex-col items-center justify-center gap-4">
          <input
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="escolha um nome"
            id="input-ref"
          />
          <button
            className="mb-2 w-full max-w-[300px] text-[1rem]"
            disabled={name.length < 3}
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
