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
        <title>Scrum Machine</title>
        <meta name="description" content="scrum machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main className="z-10 min-h-screen bg-primary">
          <img
            className="absolute right-0 top-0 h-[100vh] w-full"
            src="/wave.png"
            alt="wave background"
          />

          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  )
}
