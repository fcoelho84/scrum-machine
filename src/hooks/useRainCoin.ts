import { useCallback, useRef, useEffect } from 'react'

interface Money {
  image: HTMLImageElement
  x: number
  y: number
  angle: number
  speed: number
  currentFrame: number
  direction: number
  radius: number
  sinOffset: number
  isActive: boolean
}

type Params = {
  onEnd: () => void
}

export const useRainCoin = (params: Params) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fallingMoney = useRef<Money[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const coinImageRef = useRef<HTMLImageElement | null>(null)
  const objectPoolRef = useRef<Money[]>([])
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const img = new Image()
    img.src = '/coin.png'
    coinImageRef.current = img
  }, [])

  const createObjectPool = useCallback(() => {
    if (objectPoolRef.current.length > 0) return

    for (let i = 0; i < 150; i++) {
      const money: Money = {
        image: coinImageRef.current!,
        x: 0,
        y: 0,
        angle: 0,
        speed: 0,
        currentFrame: 0,
        direction: 0,
        radius: 0,
        sinOffset: 0,
        isActive: false,
      }
      objectPoolRef.current.push(money)
    }
  }, [])

  const getPooledMoney = useCallback((): Money | null => {
    return objectPoolRef.current.find((money) => !money.isActive) || null
  }, [])

  const drawRotatedImage = useCallback(
    (canvasContext: CanvasRenderingContext2D, money: Money) => {
      if (money.x < -100 || money.x > 900 || money.y < -100 || money.y > 900) {
        return
      }

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
    fallingMoney.current.forEach((money) => {
      money.isActive = false
    })
    fallingMoney.current = []

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    ctx?.clearRect(0, 0, 800, 800)
  }, [])

  const draw = useCallback(
    (canvasContext: CanvasRenderingContext2D, deltaTime: number) => {
      canvasContext.clearRect(0, 0, 800, 800)

      for (let i = fallingMoney.current.length - 1; i >= 0; i--) {
        const money = fallingMoney.current[i]

        if (!money?.isActive) {
          fallingMoney.current.splice(i, 1)
          continue
        }

        if (money.y > 900) {
          money.isActive = false
          fallingMoney.current.splice(i, 1)
          continue
        }

        drawRotatedImage(canvasContext, money)

        const frameSpeed = money.speed * (deltaTime / 16.67)
        money.currentFrame += frameSpeed
        money.y += frameSpeed
        money.angle += money.direction * 0.1 * (deltaTime / 16.67)

        money.x +=
          Math.sin((money.currentFrame + money.sinOffset) / (2 * Math.PI)) *
          money.radius
      }
    },
    [drawRotatedImage]
  )

  const animationLoop = useCallback(
    (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      const canvasContext = canvasRef.current?.getContext('2d')
      if (!canvasContext) return

      draw(canvasContext, deltaTime)

      if (fallingMoney.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animationLoop)
      }
    },
    [draw]
  )

  const initAnimation = useCallback(() => {
    if (animationFrameRef.current) return

    endAnimation()
    createObjectPool()

    if (!coinImageRef.current) return

    for (let i = 0; i < 100; i++) {
      const pooledMoney = getPooledMoney()
      if (!pooledMoney) break

      pooledMoney.x = Math.random() * 800
      pooledMoney.y = Math.random() * (800 * -1)
      pooledMoney.angle = Math.random() * (2 * Math.PI)
      pooledMoney.speed = 10 + Math.random() * 20
      pooledMoney.currentFrame = 0
      pooledMoney.direction = i % 2 === 1 ? 1 : -1
      pooledMoney.radius = pooledMoney.direction * (10 + (i % 6))
      pooledMoney.sinOffset = i
      pooledMoney.isActive = true

      fallingMoney.current.push(pooledMoney)
    }

    lastTimeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame(animationLoop)

    setTimeout(() => {
      endAnimation()
      params.onEnd()
    }, 5_000)
  }, [animationLoop, endAnimation, createObjectPool, getPooledMoney, params])

  return { canvasRef, initAnimation }
}
