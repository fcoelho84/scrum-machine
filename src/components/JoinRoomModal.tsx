import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useMemo, useState, type PropsWithChildren } from 'react'

import { api } from '~/utils/api'
import { useInitSocket, useSocketSendMessage } from '~/hooks/useSocket'
import { MessageTypes } from 'party/types'

interface Modal {
  open: boolean
  onClose?: () => void
}

const JoinRoomModal = (props: PropsWithChildren<Modal>) => {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const createRoom = api.room.createRoom.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])
  const initSocket = useInitSocket()

  const join = async () => {
    let id = roomId
    try {
      setIsLoading(true)
      if (!id) {
        const response = await createRoom.mutateAsync({})
        id = response.roomId
      }

      initSocket(id, name).then(() => {
        sessionStorage.setItem('name', name)
        router.push('/room/' + id)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.length >= 3 && !isLoading) {
      join()
    }
  }

  if (!props.open) return <></>

  return (
    <dialog
      open={props.open}
      className="modal bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose?.()
        }
      }}
    >
      <div className="modal-box mx-4 w-full max-w-sm border border-primary/20 bg-base-100/95 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-bold text-primary">
            {roomId ? 'Entrar na Sala' : 'Nova Sala'}
          </h2>
          <p className="mt-6 text-sm text-base-content/70">
            {roomId
              ? 'Digite seu nome para entrar'
              : 'Digite seu nome para começar'}
          </p>
        </div>

        <div className="relative mb-6">
          <input
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Seu nome"
            disabled={isLoading}
            className="
              w-full rounded-lg border-2 border-base-300 bg-transparent
              px-4 py-3 transition-all
              duration-300
              ease-out
              placeholder:text-base-content/40 hover:border-primary/50
              focus:border-primary
              focus:shadow-xl focus:shadow-primary/30 focus:outline-none focus:ring-0 focus:ring-2
              focus:ring-primary/20
            "
          />
          {name.length > 0 && name.length < 3 && (
            <div className="mt-1">
              <div className="text-xs text-warning">Mínimo 3 caracteres</div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            className="btn btn-ghost flex-1 transition-all duration-200 hover:bg-base-200"
            onClick={props.onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>

          <span className="flex items-center gap-1" data-hidden={!isLoading}>
            <span className="loading loading-spinner loading-sm" />
            Entrando...
          </span>

          <button
            className="btn btn-primary transition-all duration-300 hover:scale-105"
            onClick={join}
            data-hidden={isLoading}
            disabled={name.length < 3 || isLoading}
          >
            Entrar
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default JoinRoomModal
