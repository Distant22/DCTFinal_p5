import React from 'react';
import Sketch from 'react-p5';
import background from '../buildings/background.png'
import bank from '../buildings/bank.png'
import church from '../buildings/church.png'
import factory from '../buildings/factory.png'
import hamburger from '../buildings/hamburger-store.png'
import park from '../buildings/park.png'
import residence from '../buildings/residence.png'
import school from '../buildings/school.png'
import temple from '../buildings/temple.png'

function P5Sketch({ userInput }) {

    let bankImg, churchImg, factoryImg, hamburgerImg, parkImg, residenceImg, schoolImg, templeImg;
    let architecture = [];
    let randomChoice = [];
    let bg;

    let width = [10,140,270,400,530,660]
    let height = [10,110,210,310]

    let ranX = []

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 400).parent(canvasParentRef);
        bg = p5.loadImage(background)
        bankImg = p5.loadImage(bank);
        p5.append(architecture, bankImg);
        churchImg = p5.loadImage(church);
        p5.append(architecture, churchImg);
        factoryImg = p5.loadImage(factory);
        p5.append(architecture, factoryImg);
        hamburgerImg = p5.loadImage(hamburger);
        p5.append(architecture, hamburgerImg);
        parkImg = p5.loadImage(park);
        p5.append(architecture, parkImg);
        residenceImg = p5.loadImage(residence);
        p5.append(architecture, residenceImg);
        schoolImg = p5.loadImage(school);
        p5.append(architecture, schoolImg);
        templeImg = p5.loadImage(temple);
        p5.append(architecture, templeImg);

        for(let x = 0; x < 6; x++){
            p5.append(ranX, 10*Math.round(p5.random(0,6)));
            randomChoice[x] = []; // create nested array
            for(let y = 0; y < 4; y++){
                randomChoice[x][y] = Math.round(p5.random(0,9));                
            } 
        }
        console.log(ranX)
        console.log(randomChoice);
    }

    const draw = (p5) => {
        
        p5.background(bg);
        for(let x = 0; x < 6; x++){
            for(let y = 0; y < 4; y++){
                // console.log("x : ", x , " y : ", y)
                p5.image(architecture[randomChoice[x][y]], width[x], height[y], 80, 80);
            } 
        }
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;