import React from 'react';

const FlowDiv = props => {
    
}
    
    let width = document.documentElement.clientWidth;
    let randX = Math.ceil(Math.random() * width) - 100;

    let randInt = Math.ceil(Math.random() * 20) + 15;
    let num = Math.ceil(Math.random() * 500) + 100;
    
    let blur = () => {
        if (num >= 600) {
            return 0;
        } else if (num >= 400) {
            return 0.05;
        } else if (num >= 200) {
            return 0.1;
        } else {
            return 0.3;
        }
    }

    let z = () => {
        if (blur === 0) {
            return 4;
        } else if (blur >= 0.05) {
            return 0;
        } else if (blur >= .1) {
            return -1;
        } else {
            return -1;
        }
    }

    const FadeOutDownAnimation = keyframes`
        0% {top:-20vh; opacity:0;}
        25% {opacity:1.0;}
        100% {top:100vh; opacity:0;}
    `;
    
    const FlowDiv = styled.div`
        animation: infinite ${randInt}s ${FadeOutDownAnimation};
        position: absolute;
        z-index: ${z}; 
        left: ${randX}px;
        filter: blur(${blur}rem);
        height: ${num};
    `;