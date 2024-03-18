import React, { useState, useEffect } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { imgDB } from "../firebase";

function Test() {
    const [result, setResult] = useState(false);
    const [img, setImg] = useState(null);
    const [cities, setCities] = useState([])
    
    useEffect(() => {

        const fetchImage = async () => {
            try {
                const imgRef = ref(imgDB, 'Imgs');
                const listResult = await listAll(imgRef);
                let items = Object.values(listResult.items);
                items.sort(async(a, b) => {
                    const aMetadata = await getMetadata(a);
                    const bMetadata = await getMetadata(b);
                    return bMetadata.timeCreated - aMetadata.timeCreated;
                });
                for (let i = 0 ; i < items.length ; i++){
                    items[i] = await getDownloadURL(items[i])
                }
                setCities(items)

                const appleRef = ref(imgDB, 'Imgs/apple.jpg');
                const url = await getDownloadURL(appleRef);
                setImg(url);
                setResult(true);
            } catch (error) {
                console.error('Error fetching image:', error);
                setResult(false);
            }
        };

        fetchImage();
    }, []);

    let bg;
    let p5_city = []
    let x = -500;
    let y = -400;
    let temp_x = 0
    let temp_y = 0;

    function sketch(p5) {
        p5.setup = () => {
            console.log("Setup called")
            p5.createCanvas(1000, 800, p5.WEBGL);
        }
        
        p5.preload = () => {
            console.log("Preload called")
            bg = p5.loadImage(img);
            for (let i = 0; i < cities.length; i++) {
                p5.append(p5_city,p5.loadImage(cities[i]))
            }
        }

        p5.draw = () => {
            p5.background("gray");
            // p5.textSize(64)
            // p5.text("測試", 450, 350, 200, 200);
            console.log(p5_city.length)
            for (let i = 0; i < p5_city.length; i++){
                temp_x = x + 100 * (i % 10)
                temp_y = y + 100 * Math.floor(i / 10);
                p5.image(p5_city[i], temp_x, temp_y, 100, 100)
            }
        };
    }

    return (
        <div className="items-center justify-center flex bg-blue-50 h-screen w-screen">
            {result ? (
                <div className="flex items-center justify-center">
                    <ReactP5Wrapper sketch={sketch} />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    載入測試頁面...
                </div>
            )}
        </div>
    );
}

export default Test;

// New tool : https://github.com/P5-wrapper/react