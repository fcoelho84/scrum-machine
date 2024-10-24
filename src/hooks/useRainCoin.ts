import { useCallback, useRef } from 'react'

interface Money {
  image: HTMLImageElement
  x: number
  y: number
  angle: number
  speed: number
  currentFrame: number
  direction: number
}

export const useRainCoin = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fallingMoney = useRef<Money[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const drawRotatedImage = useCallback(
    (canvasContext: CanvasRenderingContext2D, money: Money) => {
      canvasContext.save()
      canvasContext.translate(money.x, money.y)
      canvasContext.rotate(money.angle)
      canvasContext.drawImage(
        money.image,
        0,
        0,
        100,
        (100 * money.image.height) / money.image.width
      )
      canvasContext.restore()
    },
    []
  )

  const endAnimation = useCallback(() => {
    fallingMoney.current = []
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    ctx?.clearRect(0, 0, 800, 800)
  }, [])

  const draw = useCallback(
    (canvasContext: CanvasRenderingContext2D) => {
      canvasContext.clearRect(0, 0, 800, 800)
      fallingMoney.current.forEach((money, index) => {
        drawRotatedImage(canvasContext, money)
        money.currentFrame += 1
        money.y += money.speed
        money.angle += money.direction * 0.1
        const radius = money.direction * (10 + (index % 6))
        money.x +=
          Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius
      })
    },
    [drawRotatedImage]
  )

  const initAnimation = useCallback(() => {
    if (intervalRef.current) return
    endAnimation()
    const canvasContext = canvasRef.current?.getContext('2d')
    if (!canvasContext) return

    for (let i = 0; i < 100; i++) {
      const money: Money = {
        image: new Image(),
        x: Math.random() * 800,
        y: Math.random() * (800 * -1),
        angle: Math.random() * (2 * Math.PI),
        speed: 10 + Math.random() * i,
        currentFrame: 0,
        direction: i % 2 === 1 ? 1 : -1,
      }
      money.image.src = '/coin.png'
      fallingMoney.current.push(money)
    }

    intervalRef.current = setInterval(() => draw(canvasContext), 30)

    setTimeout(endAnimation, 5_000)
  }, [draw, endAnimation])

  return { canvasRef, initAnimation }
}
