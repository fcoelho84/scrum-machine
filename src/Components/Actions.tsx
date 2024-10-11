import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CiShare1 } from 'react-icons/ci'
import { useUser } from '~/hooks/useUser'

const Actions = () => {
  const parms = useParams<{ page: string }>()
  const [userId] = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!userId) {
      router.push(window.location.origin + `?roomId=${parms.page}`)
    }
  }, [parms.page, router, userId])

  const share = () => {
    if (!parms.page || typeof window === undefined) return
    const input = document.createElement('input')
    input.value = window.location.origin + `?roomId=${parms.page}`
    input.select()
    navigator.clipboard.writeText(input.value)
  }

  return (
    <div className="z-30 w-full">
      <button data-type="text" className="m-0" onClick={share}>
        <CiShare1 />
      </button>
    </div>
  )
}

export default Actions
