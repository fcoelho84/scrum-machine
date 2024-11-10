import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useMemo, useState, type PropsWithChildren } from 'react'
import { initializeSocket } from '~/pages'

import { api } from '~/utils/api'

interface Modal {
  open: boolean
  onClose?: () => void
}

const JoinOrCreateRoomModal = (props: PropsWithChildren<Modal>) => {
  const [name, setName] = useState('')
  const router = useRouter()
  const createRoom = api.room.createRoom.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])

  const createAndJoin = async () => {
    const response = await createRoom.mutateAsync({})

    router.push('/room/' + response.roomId)
    initializeSocket(response.roomId, name)
  }

  const join = async (roomId: string) => {
    if (!roomId) return
    router.push('/room/' + roomId)
    initializeSocket(roomId, name)
  }

  const joinOrCreate = () => {
    if (roomId) join(roomId)
    else createAndJoin()
  }

  if (!props.open) return <></>

  return (
    <dialog open={props.open} className="modal bg-neutral-600/20">
      <div className="modal-box max-w-[412px] shadow-lg shadow-neutral-950">
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text">Qual o seu nome?</span>
          </div>
          <input
            onChange={(event) => setName(event.currentTarget.value)}
            type="text"
            className="input input-bordered input-ghost w-full"
          />
        </label>
        <div className="modal-action">
          <form
            method="dialog"
            onSubmit={(event) => {
              event.preventDefault()
              joinOrCreate()
            }}
          >
            <button className="btn btn-ghost mr-2" onClick={props.onClose}>
              Fechar
            </button>
            <button
              className="btn btn-accent"
              type="submit"
              disabled={name.length < 3}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default JoinOrCreateRoomModal
