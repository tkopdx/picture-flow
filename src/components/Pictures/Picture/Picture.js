import React from 'react';


const Picture = props => {

    const data = props.data;

    const style = {
        img: {
            position: `absolute`,
            left: `${data.randX}px`,
            animation: `infinite ${data.randInt}s flow`,
            height: `${data.num}px`,
            filter: `blur(${data.blurClass}rem)`,
            zIndex: `${data.z}`
        }
    }

    // const timeout = data.randInt * 10000;

    // setTimeout(() => props.deleteSelf(props.index), timeout);

    return (
            <img style={style.img} alt={props.title} onClick={() => props.clicked(props.index)} src={props.URL} title={props.title}></img>
    )
}

export default Picture;
