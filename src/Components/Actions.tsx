import { useParams } from 'next/navigation'
import { CiShare1 } from 'react-icons/ci'

const Actions = () => {
  const parms = useParams<{ page: string }>()
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
