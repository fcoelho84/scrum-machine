import "./index.css"
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';
import { useEffect } from 'react';
import { SlotData } from "hooks/slotValues";
import { useState } from 'react';

const Lamp = (props: {slotValues: SlotData[]}) => {
    const [values, setValues] = useState<SlotData[]>([]);
    const animationStatus = useAnimationProgress();

    useEffect(() => {
        if(animationStatus === enStatus.STOPPED) {
            setValues(currentValues => currentValues.map(slot => {
                slot.value = '?';
                return slot;
            }))
        }

    }, [animationStatus])

    useEffect(() => {
        setValues(props.slotValues);
    }, [props.slotValues])

    return (
        <div className="lamp-area">
            {values.map((data) => <div data-active={data.value !== '?'}className="lamp"/>)}
        </div>
    )
}


export default Lamp;