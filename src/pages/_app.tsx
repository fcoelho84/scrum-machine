import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export default api.withTRPC(MyApp)
