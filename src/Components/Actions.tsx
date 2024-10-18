import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CiShare1 } from 'react-icons/ci'
import { socket } from '~/pages'

const Actions = () => {
  const parms = useParams<{ page: string }>()
  const router = useRouter()

  useEffect(() => {
    if (socket) return
    router.push(window.location.origin + `?roomId=${parms.page}`)
  }, [parms.page, router])

  const share = () => {
    if (!parms.page || typeof window === undefined) return
    const input = document.createElement('input')
    input.value = window.location.origin + `?roomId=${parms.page}`
    input.select()
    navigator.clipboard.writeText(input.value)
  }

  return (
    <div className="absolute left-1 top-1 z-30">
      <button data-type="text" className="m-0" onClick={share}>
        <CiShare1 />
      </button>
    </div>
  )
}

export default Actions
