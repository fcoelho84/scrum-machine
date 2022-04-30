
export const random = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const timeout = (callbackFn: Function, duration: number) => {
    const timeout = setTimeout(() => {
        if(callbackFn) callbackFn();
        clearTimeout(timeout);
    }, duration)
}