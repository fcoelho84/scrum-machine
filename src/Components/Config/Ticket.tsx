import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import { socket as socketInstance } from '~/pages'

const Ticket: FC<PropsWithChildren> = (props) => {
  const parms = useParams<{ page: string }>()
  const router = useRouter()

  useEffect(() => {
    if (socketInstance) return
    router.push(window.location.origin + `?roomId=${parms.page}`)
  }, [parms.page, router])

  return (
    <div className="absolute left-4 top-[-440px] z-40 transition-all duration-700 ease-in-out hover:top-0 max-lg:hidden">
      <img
        src="/ticket.png"
        alt="room ticket menu"
        className="aspect-[300/456]"
      />
      <div className="g-4 absolute left-0 top-0 flex aspect-[300/456] h-full w-full flex-col p-4 pt-20 font-pixelify">
        {props.children}
      </div>
    </div>
  )
}

export default Ticket
