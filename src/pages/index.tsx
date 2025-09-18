import { useSearchParams } from 'next/navigation'
import { type FC, useEffect, useMemo } from 'react'
import JoinRoomModal from '~/components/JoinRoomModal'
import { env } from '~/env'
import { useToggleable } from '~/hooks/useToggleable'
import { api } from '~/utils/api'
import BackgroundPage from '~/components/BackgroundPage'

const Card: FC<{
  icon: string
  title: string
  description: string
}> = ({ icon, title, description }) => {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-slate-800/70">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white"> {title} </h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}

const SlotMachineLogo = () => {
  return (
    <div className="relative">
      <div className="relative h-24 w-16 rounded-lg border-2 border-primary/50 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
        <div className="absolute inset-1 rounded bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="flex h-full flex-col justify-between p-1">
            <div className="flex h-5 w-full items-center justify-center rounded bg-gradient-to-r from-primary to-accent">
              <span className="text-xs font-bold text-white">🎯</span>
            </div>
            <div className="flex h-5 w-full items-center justify-center rounded bg-gradient-to-r from-accent to-primary">
              <span className="text-xs font-bold text-white">🎲</span>
            </div>
            <div className="flex h-5 w-full items-center justify-center rounded bg-gradient-to-r from-primary to-accent">
              <span className="text-xs font-bold text-white">💰</span>
            </div>
          </div>
        </div>

        <div className="absolute -right-2 top-1/2 h-8 w-3 -translate-y-1/2 rounded-r-full bg-gradient-to-r from-accent to-accent/70 shadow-lg" />
      </div>
      <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 blur-sm" />
    </div>
  )
}

const Home: FC = () => {
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])
  const [open, toggleOpen, setToggle] = useToggleable()
  const count = api.room.roomCount.useQuery(roomId ?? '', {
    enabled: Boolean(roomId),
  })

  const maxSizeReached = useMemo(
    () => (count?.data ?? 0) > env.NEXT_PUBLIC_MAX_CONNECTIONS,
    [count]
  )

  useEffect(() => {
    if (!count?.data || maxSizeReached) return

    setToggle(Boolean(roomId))
  }, [roomId, setToggle, count, maxSizeReached])

  return (
    <BackgroundPage>
      <JoinRoomModal open={open} onClose={toggleOpen} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="mb-16 text-center">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <SlotMachineLogo />
            </div>
          </div>

          <h1 className="mb-10 text-6xl font-bold text-white max-sm:text-4xl">
            <span className="animate-pulse bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              SCRUM
            </span>
            <span
              className="ml-4 animate-pulse bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent"
              style={{ animationDelay: '0.5s' }}
            >
              MACHINE
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300 max-sm:text-lg">
            Transforme suas reuniões de planejamento em uma experiência
            <span className="font-semibold text-primary"> interativa</span> e
            <span className="font-semibold text-accent"> divertida</span>
          </p>
        </div>

        <div className="mb-20 flex flex-col items-center gap-6 sm:flex-row">
          <button
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-10 py-5 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
            onClick={toggleOpen}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>🚀</span>
              Criar Nova Sala
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <div
            className="tooltip"
            data-tip={
              maxSizeReached ? 'Sala lotada' : 'Entre em uma sala existente'
            }
          >
            <button
              disabled={!roomId || maxSizeReached}
              data-hidden={!roomId && maxSizeReached}
              className="group relative overflow-hidden rounded-xl border-2 border-primary/50 bg-slate-800/50 px-10 py-5 text-lg font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-slate-800/70 hover:shadow-xl hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={toggleOpen}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🎯</span>
                Entrar em Sala
              </span>
              <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <Card
            icon="📊"
            title="Estimativas Precisas"
            description="Sistema de votação que facilita o planejamento de sprints"
          />
          <Card
            icon="👥"
            title="Colaboração em Equipe"
            description="Trabalhe simultaneamente com toda sua equipe"
          />
          <Card
            icon="⚡"
            title="Agilidade"
            description="Reuniões mais rápidas e eficientes"
          />
        </div>
      </div>
    </BackgroundPage>
  )
}

export default Home
