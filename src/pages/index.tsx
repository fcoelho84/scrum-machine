import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { api, type RouterInputs, type RouterOutputs } from '~/utils/api'

type User = RouterInputs['room']['update']['user']

type Room = RouterOutputs['room']['update']

export default function Home() {
  const router = useRouter()

  const updateRoom = api.room.update.useMutation()
  const createRoom = api.room.create.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])

  const persistUserId = (room: Room) => {
    const currentUser = room.users.pop() as User
    if (!currentUser.id) return
    localStorage.setItem('userId', currentUser.id)
  }

  const update = useCallback(
    async (user: User) => {
      if (!roomId) return
      const room = await updateRoom.mutateAsync({
        roomId,
        user: user,
      })
      persistUserId(room)
      return room
    },
    [roomId, updateRoom]
  )

  const create = useCallback(
    async (user: User) => {
      const room = await createRoom.mutateAsync(user)
      persistUserId(room)
      return room
    },
    [createRoom]
  )

  const hanldeUpdate = async () => {
    const room = await update({ isAdmin: false, name: 'false', point: 0 })
    if (!room) return
    await router.push(`/room/${room.id}`)
  }

  const handleCreate = async () => {
    const room = await create({ isAdmin: true, name: 'false', point: 0 })
    if (!room) return
    await router.push(`/room/${room.id}`)
  }

  return (
    <>
      <Head>
        <title>Scrum Machine</title>
        <meta name="description" content="scrum machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="z-10 min-h-screen bg-primary">
        <img
          className="absolute right-0 top-0 h-[100vh] w-full"
          src="/wave.png"
          alt="wave background"
        />
        <div className="absolute left-[80px] top-[130px] flex max-w-[500px] flex-col items-center">
          <h1 className="mb-[150px] block text-center text-8xl text-highlight">
            scrum machine
          </h1>
          <button
            className="w-full max-w-[300px] text-[1rem]"
            onClick={hanldeUpdate}
          >
            Entrar
          </button>
          <button
            data-type="text"
            className="max-w-[300px] text-[1rem]"
            onClick={handleCreate}
          >
            Criar sala
          </button>
        </div>
      </main>
    </>
  )
}
