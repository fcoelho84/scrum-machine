import Volume from './Form/Volume'
import Values from './Form/Values'
import Theme from './Form/Theme'
import { FiMenu, FiX } from 'react-icons/fi'
import SpectatorMode from './Form/Spectator'

const RoomConfigDrawer = () => {
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
            <span className="text-xl">Configurações</span>
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <FiX size={24} />
            </label>
          </div>
          <Volume />
          <Values />
          <Theme />
          <SpectatorMode />
        </div>
      </div>
    </div>
  )
}

export default RoomConfigDrawer
