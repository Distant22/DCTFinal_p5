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
import resultBackground from '../background-img/result.png'

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
                query(collection(txtDB, "users"), orderBy("uploadTime", "desc"), limit(60))
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

    // -495 + 每一列多 69
    let x = -426;

    // -405 + 每一列多 74
    let y = -328;
    
    let temp_x = 0
    let temp_y = 0;
    let fontRegular;
    let fontEmoji;
    let backgroundImage
    let result_matrix = [
        // [0, 0], [0, 1], [0, 2], [0, 4], [0, 5], [0, 7], 
        [1, 4], [1, 5], [1, 7], [1, 9], [1, 10], [1, 12],
        [2, 0], [2, 1], [2, 2], 
        [3, 0], [3, 1], [3, 2], [3, 4], [3, 5], [3, 6], [3, 7], [3, 9], [3, 10], [3, 12],
        [4, 4], [4, 5], [4, 6], [4, 7], [4, 9], [4, 10], [4, 12],
        [5, 0], [5, 1], [5, 2], 
        [6, 0], [6, 1], [6, 2], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 12],
        [8, 0], [8, 1], [8, 2], [8, 4], [8, 6], [8, 7], [8, 9], [8, 10], [8, 12],
        // [9, 4], [9, 6], [9, 7], [9, 9], [9, 10], [9, 12]
    ]

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    function sketch(p5) {
        p5.setup = () => {
            console.log("Setup called")
            p5.createCanvas(1000, 800, p5.WEBGL);
        }
        
        p5.preload = () => {
            shuffleArray(result_matrix)
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
            // p5.image(backgroundImage,-500,-400 + 3279 * p5.width / 3324);
        }

        p5.draw = () => {            

            console.log(p5_city.length)

            for (let i = 0; i < p5_city.length; i++){
                let building_size = 40;
                temp_x = x + (building_size + 29) * result_matrix[i][1]
                temp_y = y + (building_size + 34) * result_matrix[i][0]
                p5.image(p5_city[i], temp_x, temp_y, building_size, building_size)

                // 如果有表情符號則額外處理
                if (containsEmojis(username[i])) {
                    p5.textFont(fontEmoji);
                } else {
                    p5.textFont(fontRegular);
                }

                let textWidth = p5.textWidth(username[i]);
                let textX = temp_x + building_size / 2 - textWidth / 2;

                p5.text(username[i], textX, temp_y + 1.6 * building_size, 50, 50);
                p5.fill(80)
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
        <div className="items-center justify-center flex bg-blue-50 h-screen w-screen overflow-y-hidden"> 
            {result ? (
                <div className="flex items-center justify-center relative z-10" onClick={handleAudioPlayback}>
                    <ReactP5Wrapper sketch={sketch} />
                    <audio ref={audioRef} loop>
                        <source src={getAudioSource()} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio> 
                </div>
            ) : (
                <div className="flex items-center justify-center relative z-10">
                    載入測試頁面...
                </div>
            )}
        </div>
    );
}


export default Collection;