import { type PropsWithChildren } from 'react'
import { BiX } from 'react-icons/bi'

interface Modal {
  open: boolean
  onClose?: () => void
}

const Modal = (props: PropsWithChildren<Modal>) => {
  if (!props.open) return <></>
  return (
    <div className="absolute z-50 flex h-[100vh] w-full items-center justify-center bg-primary/90">
      <div className="z-60 relative overflow-hidden  rounded-lg border border-solid border-secondary bg-primary shadow-md shadow-secondary">
        <BiX
          onClick={props.onClose}
          className="absolute right-4 top-4 cursor-pointer text-blueGray"
          size={32}
        />
        {props.children}
      </div>
    </div>
  )
}

export default Modal
