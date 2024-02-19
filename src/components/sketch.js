import React from 'react';
import Sketch from 'react-p5';
import meme from '../meme.png'

function P5Sketch({ userInput }) {

    let img;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(300, 300).parent(canvasParentRef);
        p5.background(255, 255, 255);
        img = p5.createImg(meme)
        img.hide()
    }

    const draw = (p5) => {
        let x = (Math.random() * 200)
        let y = (Math.random() * 200)
        p5.image(img, x,y,x + 50, y + 50)
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;