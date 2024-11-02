import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import PartySocket from 'partysocket'
import { useEffect, useMemo } from 'react'
import Modal from '~/Components/Modal'
import { env } from '~/env'
import { useToggleable } from '~/hooks/useToggleable'
import { api } from '~/utils/api'

export let socket: PartySocket

export const initializeSocket = (room: string, name: string) => {
  socket = new PartySocket({
    query: {
      name,
    },
    host: env.NEXT_PUBLIC_PARTYKIT_URL,
    room,
  })
}

export default function Home() {
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])
  const [open, toggleOpen, setToggle] = useToggleable()

  useEffect(() => {
    setToggle(Boolean(roomId))
  }, [roomId, setToggle])

  return (
    <div className="relative h-[100vh] max-h-[100vh] overflow-hidden">
      <div className="absolute h-[100vh] max-h-[100vh] w-full rotate-6">
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-rotate rounded-[36%] bg-secondary opacity-5" />
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-rotate rounded-[37%] bg-secondary opacity-5" />

        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-rotate rounded-[46%] bg-secondary opacity-5 duration-[10s]" />
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-rotate rounded-[57%] bg-secondary opacity-5 duration-[10s]" />

        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-rotate rounded-[56%] bg-secondary opacity-5 duration-[12s]" />
        <div className="absolute left-[600px] top-0 h-[2300px] w-[3500px] animate-rotate rounded-[67%] bg-secondary opacity-5 duration-[12s]" />
      </div>
      <Modal open={open} onClose={toggleOpen} />

      <div className="relative ml-[92px] mt-[148px] flex max-w-[500px] flex-col items-center px-4 max-sm:ml-0 max-sm:mt-[120px]">
        <h1 className="mb-[150px] block text-center text-8xl text-primary max-sm:text-5xl">
          <span className="flicker-fast">scr</span>
          <span>um mach</span>
          <span className="flicker-fast">ine</span>
        </h1>

        <button className="btn btn-accent mb-2" onClick={toggleOpen}>
          Criar uma sala
        </button>
        <button
          data-hidden={!roomId}
          className="btn btn-ghost"
          onClick={toggleOpen}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
