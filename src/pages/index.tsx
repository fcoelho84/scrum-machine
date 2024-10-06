import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
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
          <button data-type="text" className="max-w-[300px] text-[1rem]">
            Criar sala
          </button>
        </div>
      </main>
    </>
  )
}
