import { useCallback, useRef } from "react";

interface Params {
    quantity: number,
    duration: number;
}

interface Money {
    image: HTMLImageElement;
    x: number;
    y: number;
    angle: number;
    speed: number;
    currentFrame: number;
    direction: number;
}

interface Config extends Params {
    speedOffset: number,
    speedRange: number,
    frameRate: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D;
}

export const useMakeItRain = (params: Partial<Params> = {}) => {
    
    const random = useCallback((max: number, min: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }, [])
  
    const generateMoney = useCallback((config: Config) => {
        const fallingMoney: Money[] = [];
        Array.from(Array(config.quantity)).forEach(index => {
            const isOdd = index % 2 === 1;
            const image = new Image();
            image.src = "https://images.vexels.com/media/users/3/144032/isolated/preview/1f5414b9d04b71a4972208c035a7d278-stroke-dollar-bill-by-vexels.png";
            fallingMoney.push({
                image,
                x: random(window.innerWidth, 0),
                y: random(window.innerHeight, 0),
                angle: random(2 * Math.PI, 0),
                speed: config.speedOffset + random(config.speedOffset , 0),
                currentFrame: 0,
                direction: isOdd ? 1 : -1
            });

        });
    
      const interval = setInterval(() => {
        config.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        fallingMoney.forEach(function(money, index) {
            config.context.save();
            config.context.translate(money.x, money.y);
            config.context.rotate(money.angle);
            config.context.drawImage(money.image, 0, 0, 100, 100 * money.image.height / money.image.width);
            config.context.restore();
            money.currentFrame += 1;
            money.y += money.speed;
            money.angle += money.direction * 0.1;
            const radius = money.direction * (10 + (index % 6));
            money.x += Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius; 
        })
      }, config.frameRate);
      
      setTimeout(function() {
        clearInterval(interval);
        config.canvas.remove();
      }, config.duration);
    
    }, [random])

    const prepare = useCallback(() => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d');
        if(!context) return;
        canvas.classList.add('rain');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.document.body.append(canvas);
        generateMoney({
            quantity: params.quantity ?? 300,
            duration: params.duration ?? 3000,
            speedOffset: 10,
            speedRange: 5,
            frameRate: 1000 / 30,
            canvas,
            context
        })
    }, [params, generateMoney])

    return prepare;
}