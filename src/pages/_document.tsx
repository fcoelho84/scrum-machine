import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bungee&display=swap"
        rel="stylesheet"
      />
      <Head>
        <meta name="description" content="scrum machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main className="z-10 min-h-screen bg-primary max-lg:hidden">
          <title>Scrum Machine</title>
          <Main />
          <NextScript />
        </main>
        <main className="z-10 flex min-h-screen items-center justify-center bg-primary lg:hidden">
          <h2 className="text-center text-blueGray">
            Disponível apenas na versão desktop no momento... :(
          </h2>
        </main>
      </body>
    </Html>
  )
}
