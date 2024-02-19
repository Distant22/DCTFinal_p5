import React from 'react';
import Sketch from 'react-p5';
import meme from '../meme.png'
import bank from '../bank.png'
import banana from '../banana-peel.png'
import church from '../church.png'
import factory from '../factory.png'
import hamburger from '../hamburger-store.png'
import park from '../park.png'
import residence from '../residence.png'
import school from '../school.png'
import temple from '../temple.png'

function P5Sketch({ userInput }) {

    let bankImg, bananaImg, churchImg, factoryImg, hamburgerImg, parkImg, residenceImg, schoolImg, templeImg;
    let architecture = [];
    let randomChoice = [];

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(1000, 500).parent(canvasParentRef);
        p5.background(255, 255, 255);
        bankImg = p5.createImg(bank);
        p5.append(architecture, bankImg);
        churchImg = p5.createImg(church);
        p5.append(architecture, churchImg);
        bananaImg = p5.createImg(banana);
        p5.append(architecture, bananaImg);
        factoryImg = p5.createImg(factory);
        p5.append(architecture, factoryImg);
        hamburgerImg = p5.createImg(hamburger);
        p5.append(architecture, hamburgerImg);
        parkImg = p5.createImg(park);
        p5.append(architecture, parkImg);
        residenceImg = p5.createImg(residence);
        p5.append(architecture, residenceImg);
        schoolImg = p5.createImg(school);
        p5.append(architecture, schoolImg);
        templeImg = p5.createImg(temple);
        p5.append(architecture, templeImg);

        for(let x = 0; x < 10; x++){
            randomChoice[x] = []; // create nested array
            for(let y = 0; y < 5; y++){
                randomChoice[x][y] = Math.round(p5.random(0,9));
            } 
        }
        
        console.log(randomChoice);
    }

    const draw = (p5) => {
        // let x = (Math.random() * 200)
        // let y = (Math.random() * 200)
        // p5.image(img, x,y,x + 50, y + 50)
        // p5.image(bankImg, 0, 0, 100, 100);
        // p5.image(bananaImg, 100, 0, 100, 100);
        // p5.image(churchImg, 200, 0, 100, 100);
        // p5.image(factoryImg, 300, 0, 100, 100);
        // p5.image(hamburgerImg, 400, 0, 100, 100);
        // p5.image(parkImg, 500, 0, 100, 100);
        // p5.image(residenceImg, 600, 0, 100, 100);
        // p5.image(schoolImg, 700, 0, 100, 100);
        // p5.image(templeImg, 800, 0, 100, 100);
        // p5.image(templeImg, 900, 0, 100, 100);
        // p5.image(templeImg, 1000, 0, 100, 100);
        for(let x = 0; x < 10; x++){
            for(let y = 0; y < 5; y++){
                p5.image(architecture[randomChoice[x][y]], 100*x, 100*y, 100, 100);
            } 
        }
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;