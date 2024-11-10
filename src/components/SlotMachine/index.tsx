import type React from 'react'
import { type PropsWithChildren } from 'react'

import Slot from './Slot'
import Default from './themes/Default'

enum themes {
  default = 'default',
}

type Component = (props: PropsWithChildren) => React.JSX.Element

type Props = { theme?: themes }

const Themes: Record<themes, Component> = {
  [themes.default]: Default,
}

const Container = (props: PropsWithChildren<Props>) => {
  const Component = Themes[props.theme ?? 'default']
  return <Component>{props.children}</Component>
}

Container.Slot = Slot

export default Container
