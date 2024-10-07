import Head from 'next/head'
import { api } from '~/utils/api'
import { socket } from './_app'
import { useRouter } from 'next/router'

export default function Home() {
  const { mutateAsync } = api.room.create.useMutation()
  const router = useRouter()

  const createRoom = async () => {
    const room = await mutateAsync({
      name: 'teste',
      point: 0,
      isAdmin: true,
    })
    const [user] = room.users
    if (!user) {
      console.error('user not found')
      return
    }
    localStorage.setItem('userId', user.id)
    socket.connect().emit('join', room.id)
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
          <button className="w-full max-w-[300px] text-[1rem]">Entrar</button>
          <button
            data-type="text"
            className="max-w-[300px] text-[1rem]"
            onClick={createRoom}
          >
            Criar sala
          </button>
        </div>
      </main>
    </>
  )
}
