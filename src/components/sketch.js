import React from 'react';
import Sketch from 'react-p5';

function P5Sketch({ userInput }) {

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(300, 300).parent(canvasParentRef);
        p5.background(255, 255, 255);
    }

    const draw = (p5) => {
        p5.fill(p5.color(
            170+Math.floor(Math.random() * 50),
            170+Math.floor(Math.random() * 50),
            170+Math.floor(Math.random() * 50)
        ));
        p5.ellipse(
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            userInput/3+Math.floor(Math.random() * 10)
        );
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;