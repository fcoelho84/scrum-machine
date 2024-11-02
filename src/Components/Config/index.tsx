import Volume from './Form/Volume'
import Values from './Form/Values'
import Theme from './Form/Theme'
import Drawer from './Drawer'

const Config = () => {
  return (
    <Drawer title="Configurações">
      <Volume />
      <Values />
      <Theme />
    </Drawer>
  )
}

export default Config
