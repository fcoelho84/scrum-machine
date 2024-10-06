import { useState } from 'react'
import JackpotLogo from '~/Components/Jackpot'
import Slot from '~/Components/Slot'
import SlotContainer from '~/Components/SlotContainer'
import { useSlotValues } from '~/hooks/useSlotValues'

const Room = () => {
  const [spin, setSpin] = useState(false)
  const { slotValues, numbers } = useSlotValues()

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-6 bg-primary p-6">
      <JackpotLogo active={spin} />
      <SlotContainer>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((key, index) => (
          <Slot items={slotValues} spin={spin} index={index} key={index} />
        ))}
      </SlotContainer>

      <div className="z-10 flex flex-wrap gap-2">
        {numbers.map((item, key) => (
          <button className="min-w-[76px]" key={key}>
            {item}
          </button>
        ))}
      </div>

      <button
        className="z-10 min-w-[185px]"
        onClick={() => setSpin((shouldSpin) => !shouldSpin)}
      >
        {!spin ? 'Girar' : 'Resetar'}
      </button>

      <button className="z-10 min-w-[150px]">Dinheiro</button>
    </div>
  )
}

export default Room
