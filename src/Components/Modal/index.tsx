import { type PropsWithChildren } from 'react'

interface Modal {
  open: boolean
}

const Modal = (props: PropsWithChildren<Modal>) => {
  if (!props.open) {
    return <></>
  }
  return (
    <div className="absolute z-50 flex h-[100vh] w-full items-center justify-center bg-primary/90">
      <div className="z-60 relative overflow-hidden  rounded-lg border border-solid border-secondary bg-primary shadow-md shadow-secondary">
        {props.children}
      </div>
    </div>
  )
}

export default Modal
