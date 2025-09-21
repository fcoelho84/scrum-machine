import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useMemo, useState, type PropsWithChildren } from 'react'

import { api } from '~/utils/api'
import { useInitSocket } from '~/hooks/useSocket'

interface Modal {
  open: boolean
  onClose?: () => void
}

const SlotMachineLogo = () => {
  return (
    <div className="relative">
      <div className="relative h-8 w-6 rounded-lg border-2 border-primary/50 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl sm:h-10 sm:w-8">
        <div className="absolute inset-1 rounded bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="flex h-full flex-col justify-between p-0.5">
            <div className="flex h-1.5 w-full items-center justify-center rounded bg-gradient-to-r from-primary to-accent sm:h-2">
              <span className="text-xs font-bold text-white">🎯</span>
            </div>
            <div className="flex h-1.5 w-full items-center justify-center rounded bg-gradient-to-r from-accent to-primary sm:h-2">
              <span className="text-xs font-bold text-white">🎲</span>
            </div>
            <div className="flex h-1.5 w-full items-center justify-center rounded bg-gradient-to-r from-primary to-accent sm:h-2">
              <span className="text-xs font-bold text-white">💰</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-0.5 top-1/2 h-3 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-r from-accent to-accent/70 shadow-lg sm:-right-1 sm:h-4 sm:w-1.5" />
      </div>
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 blur-sm" />
    </div>
  )
}

const JoinRoomModal = (props: PropsWithChildren<Modal>) => {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [nameError, setNameError] = useState('')
  const router = useRouter()
  const createRoom = api.room.createRoom.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])
  const initSocket = useInitSocket()
  const roomData = api.room.fetchRoom.useQuery(roomId ?? '', {
    enabled: Boolean(roomId),
  })

  const join = async () => {
    let id = roomId
    try {
      setIsLoading(true)
      setNameError('')

      if (roomId && roomData.data) {
        const existingUser = roomData.data.users.find(
          (user) => user.name === name
        )
        if (existingUser) {
          setNameError('Este nome já está sendo usado na sala')
          return
        }
      }

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
    if (e.key === 'Enter' && name.length >= 3 && !isLoading && !nameError) {
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
      <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-800/80" />

        <div className="relative z-10">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                {roomId ? 'Entrar na Sala' : 'Nova Sala'}
              </span>
            </h2>
            <p className="text-sm text-slate-300 sm:text-base">
              {roomId
                ? 'Digite seu nome para entrar na sala'
                : 'Digite seu nome para começar uma nova aventura'}
            </p>
          </div>

          <div className="relative mb-6">
            <div className="relative">
              <input
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value)
                  if (nameError) setNameError('')
                }}
                onKeyPress={handleKeyPress}
                type="text"
                placeholder="Seu nome"
                disabled={isLoading}
                className="w-full rounded-xl border-2 border-slate-600/50 bg-slate-700/50 px-4 py-3 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-slate-700/70 focus:shadow-xl focus:shadow-primary/20 focus:outline-none disabled:opacity-50"
              />
            </div>

            {name.length > 0 && name.length < 3 && (
              <div className="animate-fade-in mt-2">
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <span>⚠️</span>
                  <span>Mínimo 3 caracteres</span>
                </div>
              </div>
            )}
            {nameError && (
              <div className="animate-fade-in mt-2">
                <div className="flex items-center gap-1 text-xs text-red-400">
                  <span>❌</span>
                  <span>{nameError}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className="flex-1 overflow-hidden rounded-xl border-2 border-slate-600/50 bg-slate-700/50 px-4 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:bg-slate-700/70 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={props.onClose}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center gap-2">
                <span>❌</span>
                <span>Cancelar</span>
              </span>
            </button>

            <button
              className="flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={join}
              disabled={name.length < 3 || isLoading || !!nameError}
            >
              <span
                data-hidden={isLoading}
                className="flex items-center justify-center gap-2"
              >
                <span>{roomId ? '🎯' : '🚀'}</span>
                <span>{roomId ? 'Entrar' : 'Criar'}</span>
              </span>

              <span data-hidden={!isLoading}>Entrando...</span>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default JoinRoomModal
