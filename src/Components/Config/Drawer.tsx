import { FiMenu, FiX } from 'react-icons/fi'

import { type PropsWithChildren } from 'react'

type Props = {
  title: string
}

const Drawer = (props: PropsWithChildren<Props>) => {
  return (
    <div className="drawer absolute left-4 top-4 z-50 h-fit w-fit">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
        <FiMenu size={24} />
      </label>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu flex min-h-full w-80 flex-col gap-4 bg-base-200 p-4 text-base-content">
          <div className="mb-4 flex flex-row items-center justify-between">
            <span className="text-xl">{props.title}</span>
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <FiX size={24} />
            </label>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Drawer
