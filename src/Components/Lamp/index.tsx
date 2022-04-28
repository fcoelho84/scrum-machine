import "./index.css"
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';
import { useEffect } from 'react';
import { useState } from 'react';

const Lamp = (props: {value: string, name: string, lampColor: string}) => {
    const [value, setValue] = useState<string>(props.value);
    const animationStatus = useAnimationProgress();

    useEffect(() => {
        if(animationStatus === enStatus.STOPPED) {
            setValue('?');
        }

    }, [animationStatus])

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    return (
        <div 
            data-active={value !== '?' ? props.lampColor : ''}
            className="lamp"> 
            <div className="lamp-name">
                <span>{props.name}</span>
            </div>
        </div>
    )
}


export default Lamp;