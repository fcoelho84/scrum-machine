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
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-slate-800/70 sm:p-4 md:p-5">
      <div className="mb-2 text-2xl sm:mb-3 sm:text-3xl">{icon}</div>
      <h3 className="mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base">
        {title}
      </h3>
      <p className="text-xs text-slate-400 sm:text-sm">{description}</p>
    </div>
  )
}

const SlotMachineLogo = () => {
  return (
    <div className="relative">
      <div className="relative h-12 w-8 rounded-lg border-2 border-primary/50 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl sm:h-16 sm:w-12 md:h-20 md:w-14 lg:h-24 lg:w-16">
        <div className="absolute inset-1 rounded bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="flex h-full flex-col justify-between p-1">
            <div className="flex h-2 w-full items-center justify-center rounded bg-gradient-to-r from-primary to-accent sm:h-3 md:h-4 lg:h-5">
              <span className="text-xs font-bold text-white">🎯</span>
            </div>
            <div className="flex h-2 w-full items-center justify-center rounded bg-gradient-to-r from-accent to-primary sm:h-3 md:h-4 lg:h-5">
              <span className="text-xs font-bold text-white">🎲</span>
            </div>
            <div className="flex h-2 w-full items-center justify-center rounded bg-gradient-to-r from-primary to-accent sm:h-3 md:h-4 lg:h-5">
              <span className="text-xs font-bold text-white">💰</span>
            </div>
          </div>
        </div>

        <div className="absolute -right-1 top-1/2 h-4 w-1.5 -translate-y-1/2 rounded-r-full bg-gradient-to-r from-accent to-accent/70 shadow-lg sm:-right-1 sm:h-6 sm:w-2 md:-right-2 md:h-8 md:w-3" />
      </div>
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 blur-sm sm:-inset-1 md:-inset-2" />
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

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-2 py-4 sm:px-4 sm:py-6 md:py-8 lg:py-12">
        <div className="mb-4 text-center sm:mb-6 md:mb-8">
          <div className="mb-4 flex justify-center sm:mb-6 md:mb-8">
            <div className="relative">
              <SlotMachineLogo />
            </div>
          </div>

          <h1 className="mb-2 text-xl font-bold text-white sm:mb-3 sm:text-2xl md:mb-4 md:text-3xl lg:mb-6 lg:text-4xl xl:text-5xl">
            <span className="animate-pulse bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              SCRUM
            </span>
            <span
              className="ml-1 animate-pulse bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent sm:ml-2 md:ml-3"
              style={{ animationDelay: '0.5s' }}
            >
              MACHINE
            </span>
          </h1>

          <p className="mx-auto max-w-2xl px-2 text-xs leading-relaxed text-slate-300 sm:px-0 sm:text-sm md:text-base lg:text-lg">
            Transforme suas reuniões de planejamento em uma experiência
            <span className="font-semibold text-primary"> interativa</span> e
            <span className="font-semibold text-accent"> divertida</span>
          </p>
        </div>

        <div className="mb-4 flex w-full max-w-md flex-col items-center gap-2 sm:mb-6 sm:max-w-lg sm:gap-3 md:mb-8 md:max-w-2xl md:flex-row md:gap-4 lg:mb-10">
          <button
            className="w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-3 py-2 text-xs font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 sm:px-4 sm:py-2.5 sm:text-sm md:w-auto md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg"
            onClick={toggleOpen}
          >
            <span className="flex items-center justify-center gap-1 sm:gap-2">
              <span>🚀</span>
              <span className="hidden sm:inline">Criar Nova Sala</span>
              <span className="sm:hidden">Criar Sala</span>
            </span>
          </button>

          <div
            className="tooltip w-full md:w-auto"
            data-tip={
              maxSizeReached ? 'Sala lotada' : 'Entre em uma sala existente'
            }
          >
            <button
              disabled={!roomId || maxSizeReached}
              data-hidden={!roomId && maxSizeReached}
              className="w-full overflow-hidden rounded-xl border-2 border-primary/50 bg-slate-800/50 px-3 py-2 text-xs font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-slate-800/70 hover:shadow-xl hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 sm:text-sm md:w-auto md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg"
              onClick={toggleOpen}
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <span>🎯</span>
                <span className="hidden sm:inline">Entrar na sala</span>
                <span className="sm:hidden">Entrar</span>
              </span>
            </button>
          </div>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-3 text-center sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8">
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
