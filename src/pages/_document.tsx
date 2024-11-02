import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme="default">
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
        <main className="z-10 min-h-screen">
          <title>Scrum Machine</title>
          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  )
}
