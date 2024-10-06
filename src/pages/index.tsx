import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Scrum Machine</title>
        <meta name="description" content="scrum machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-primary">
        <h1 className="m ax-w-[503px] text-center text-8xl text-highlight">
          scrum machine
        </h1>
      </main>
    </>
  )
}
