import { type ChangeEvent } from 'react'
import { useConfigContext } from '../context'

const themes = [
  'default',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
]

const Theme = () => {
  const context = useConfigContext()

  const selectTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.currentTarget.value ?? 0)
    context.setTheme(themes[index] ?? 'default')
  }

  return (
    <select
      className="select select-bordered h-fit w-full"
      onChange={selectTheme}
    >
      <option disabled selected>
        Tema
      </option>
      {themes.map((value, key) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  )
}

export default Theme
