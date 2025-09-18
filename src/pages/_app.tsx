import { type AppType } from 'next/app'
import { useEffect } from 'react'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { useInitSocket } from '~/hooks/useSocket'
import { useParams } from 'next/navigation'

const MyApp: AppType = ({ Component, pageProps }) => {
  const initSocket = useInitSocket()
  const params = useParams()

  useEffect(() => {
    const name = sessionStorage.getItem('name')
    if (!params?.roomId || !name) return
    initSocket(params.roomId as string, name)
  }, [initSocket, params?.roomId])
  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

export default api.withTRPC(MyApp)
