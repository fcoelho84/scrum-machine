import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import {} from 'party/types'
import { useMemo } from 'react'
import { api } from '~/utils/api'

export default function Home() {
  const router = useRouter()
  const joinRoom = api.room.joinRoom.useMutation()
  const createRoom = api.room.createRoom.useMutation()
  const search = useSearchParams()
  const roomId = useMemo(() => search.get('roomId'), [search])

  const handleCreate = async () => {
    const response = await createRoom.mutateAsync({ userName: '' })
    localStorage.setItem('user', response.user.id)
    router.push('/room/' + response.id)
  }

  const handleJoin = async () => {
    if (!roomId) return
    const response = await joinRoom.mutateAsync({ userName: '', roomId })
    localStorage.setItem('user', response.user.id)
    router.push('/room/' + roomId)
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
            disabled={!roomId}
            className="w-full max-w-[300px] text-[1rem]"
            onClick={handleJoin}
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
