import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import {} from 'party/types'
import { LegacyRef, useMemo, useRef, useState } from 'react'
import Modal from '~/Components/Modal'
import { useToggleable } from '~/hooks/useToggleable'
import { useUser } from '~/hooks/useUser'
import { api } from '~/utils/api'

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
    <div>
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

      <div className="relative left-[80px] top-[130px] flex max-w-[500px] flex-col items-center">
        <h1 className=" mb-[150px] block text-center text-8xl text-highlight">
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
