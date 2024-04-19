import React, { useState, useEffect, useRef } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { collection, limit, query, getDocs, orderBy } from "firebase/firestore";
import { imgDB, txtDB } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import hopelessAudio from '../music/hopeless.wav';
import sadAudio from '../music/sad.wav';
import collapseAudio from '../music/collapse.wav';
import suicideAudio from '../music/suicide.wav';
import depressionAudio from '../music/depression.wav';
import mildAudio from '../music/mild.wav';
import satisfyAudio from '../music/satisfy.wav';
import yesAudio from '../music/yes.wav';
import sunnyAudio from '../music/sunny.wav';
import cheerAudio from '../music/cheer.wav';
import happyAudio from '../music/happy.wav';
import resultBackground from '../background-img/resultBackground.png';

function Collection() {
    const [result, setResult] = useState(false);
    const [cities, setCities] = useState([])
    const [username, setUsername] = useState([])
    const audioRef = useRef(null);
    const [highestMusicName, setHighestMusicName] = useState("");
    const allAudio = [hopelessAudio, sadAudio, collapseAudio, suicideAudio, depressionAudio, mildAudio, satisfyAudio, yesAudio, sunnyAudio, cheerAudio, happyAudio];
    const allAudioName = ['hopeless','sad','collapse','suicide','depression','mild','satisfy','yes','sunny','cheer','happy'];
    
    
    useEffect(() => {

        const fetchResults = async () => {
            const querySnapshot = await getDocs(
                query(collection(txtDB, "users"), orderBy("uploadTime", "desc"), limit(100))
            );
            const cities = [];
            const username = [];
            const promises = [];
    
            querySnapshot.forEach((doc) => {
                const imgUrlPromise = new Promise(async (resolve, reject) => {
                    try {
                        const imgRef = ref(imgDB, `${doc.data().imgType}.png`);
                        const url = await getDownloadURL(imgRef);
                        cities.push(url);
                        username.push(doc.data().name);
                        resolve();
                    } catch (error) {
                        reject(error); 
                    }
                });
                promises.push(imgUrlPromise);
            });

            await Promise.all(promises);
            setCities(cities);
            setUsername(username);
            setResult(true);
        };
        fetchResults();
        fetchHighestCountMusic();
    }, []);
    
    const getAudioSource = () => {   
        const highestMusicIndex = allAudioName.indexOf(highestMusicName);
        console.log(highestMusicName, highestMusicIndex);
        console.log(allAudio[highestMusicIndex]);
        return allAudio[highestMusicIndex];
      };

    const fetchHighestCountMusic = async () => {
        try {
          const musicRef = collection(txtDB, 'music');
          const querySnapshot = await getDocs(query(musicRef, orderBy('time', 'desc'), limit(1)));
      
          // Check if any documents exist
          if (!querySnapshot.empty) {
            const highestCountMusic = querySnapshot.docs[0];
            const musicName = highestCountMusic.id; // Get the ID of the document, which represents the music name
            console.log('The music with the highest count is:', musicName);
            setHighestMusicName(musicName);
          } else {
            console.log('No music found in the collection.');
          }
        } catch (error) {
          console.error('Error fetching highest count music:', error);
        }
      };

    let p5_city = []
    let x = -495;
    let y = -405;
    let temp_x = 0
    let temp_y = 0;
    let fontRegular;
    let fontEmoji;
    

    function sketch(p5) {  
        let backgroundImage;

        p5.preload = () => {
            backgroundImage = p5.loadImage(resultBackground);
            fontRegular = p5.loadFont("./NotoSansTC-Bold.ttf");
            fontEmoji = p5.loadFont("./NotoEmoji-Bold.ttf");
            console.log("Preload called")
            for (let i = 0; i < cities.length; i++) {
                p5.append(p5_city,p5.loadImage(cities[i]))
            }
        }

        p5.setup = () => {
            console.log("Setup called")
            p5.createCanvas(1000, 3500, p5.WEBGL);
            backgroundImage.resize(p5.width, 3279 * p5.width / 3324);
            console.log(backgroundImage.width, backgroundImage.height);
            p5.image(backgroundImage,-500,-400);
            p5.image(backgroundImage,-500,-400 + 3279 * p5.width / 3324);
        }

        p5.draw = () => {            
            console.log(p5_city.length)

            for (let i = 0; i < p5_city.length; i++){
                let building_size = 40;
                let building_column_count = 15;

                // 設定顯示的 x , y 軸
                temp_x = x + (building_size + 29) * (i % building_column_count)
                temp_y = y + (building_size + 37) * Math.floor(i / building_column_count);
                p5.image(p5_city[i], temp_x, temp_y, building_size, building_size)

                // 如果有表情符號則額外處理
                if (containsEmojis(username[i])) {
                    p5.textFont(fontEmoji);
                } else {
                    p5.textFont(fontRegular);
                }

                let textWidth = p5.textWidth(username[i]);
                let textX = temp_x + building_size / 2 - textWidth / 2;

                p5.text(username[i], textX, temp_y + 1.3 * building_size, 50, 50);
            }
        };
    }

    function containsEmojis(str) {
        let emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
        return emojiRegex.test(str);
    }

    const handleAudioPlayback = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="items-center justify-center flex bg-blue-50 h-screen w-screen"> 
            {result ? (
                <div className="flex items-center justify-center" onClick={handleAudioPlayback}>
                    <ReactP5Wrapper sketch={sketch} />
                    <audio ref={audioRef} loop>
                        <source src={getAudioSource()} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio> 
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    載入測試頁面...
                </div>
            )}
        </div>
    );
}


export default Collection;