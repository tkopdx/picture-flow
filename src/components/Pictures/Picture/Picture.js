import React from 'react';
import { FadeOutDown } from 'react-animations';

import './Picture.css';

const Picture = props => {

    let num = Math.ceil(Math.random() * 3);
    
    const placementStyles = {
        1: 'pic-front',
        2: 'pic-middle',
        3: 'pic-back'
    }

    let style = placementStyles[num]
    
    return (
        <FadeOutDown>
            <div>
                <img className={style} src={props.URL}></img>
            </div>
        </FadeOutDown>
    )
}

export default Picture;