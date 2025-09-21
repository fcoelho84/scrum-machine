import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import SlotMachine from '~/components/SlotMachine'
import BackgroundPage from '~/components/BackgroundPage'
import Options from '~/components/Options'
import Controls from '~/components/Controls'

const Room = () => {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const name = sessionStorage.getItem('name')
    if (!name && params?.roomId) {
      const roomId = Array.isArray(params.roomId)
        ? params.roomId[0]
        : params.roomId
      router.push(`/?roomId=${roomId}`)
    }
  }, [params?.roomId, router])

  if (!params?.roomId) {
    return <></>
  }

  const name = sessionStorage.getItem('name')

  if (!name) {
    return <></>
  }

  return (
    <BackgroundPage>
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4 sm:gap-6 sm:p-6">
        <SlotMachine />
        <Options />
        <Controls />
      </div>
    </BackgroundPage>
  )
}

export default Room
