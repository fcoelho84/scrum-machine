
import { useRef, useEffect } from 'react';


export const useCreateSlot = (id: string) => {
    const ref = useRef<HTMLDivElement>(null);
    const slotValues = useRef(['?', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40']);
    
    useEffect(() => {
        if(!ref.current || !slotValues.current) return;
        const slotsPerReel = slotValues.current.length;
        const slotAngle = 360 / slotsPerReel;
        const radius = Math.round( ( 90 / 2) / Math.tan( Math.PI / slotsPerReel ) );
        for (let i = 0; i < slotsPerReel; i ++) {
            const slot = document.createElement('div');
            if(i === 0) {
                slot.id = id;
            }
            slot.className = 'slot';
            slot.style.transform = `rotateX(${slotAngle * i}deg) translateZ(${radius}px)`;
            slot.innerHTML = String(slotValues.current[i]);
            ref.current.append(slot);
        }

    }, [id])

    return ref
}