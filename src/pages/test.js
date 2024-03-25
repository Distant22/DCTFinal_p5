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

function Test() {
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
    let x = -500;
    let y = -400;
    let temp_x = 0
    let temp_y = 0;
    let font;

    function sketch(p5) {
        p5.setup = () => {
            console.log("Setup called")
            p5.createCanvas(1000, 800, p5.WEBGL);
        }
        
        p5.preload = () => {
            setTimeout(() => {
                font = p5.loadFont("./OpenSans-Bold.ttf");
                console.log("Preload called")
                for (let i = 0; i < cities.length; i++) {
                    p5.append(p5_city,p5.loadImage(cities[i]))
                }
            }, 3000);
        }

        p5.draw = () => {
            p5.background('gray');
            console.log(p5_city.length)
            for (let i = 0; i < p5_city.length; i++){
                temp_x = x + 100 * (i % 10)
                temp_y = y + 100 * Math.floor(i / 10);
                p5.image(p5_city[i], temp_x, temp_y, 100, 100)
                p5.textFont(font);
                p5.text(username[i], temp_x+50-(username[i].length*3.25), temp_y+125, 100, 100)
            }
        };
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

export default Test;

// New tool : https://github.com/P5-wrapper/react


// import { v4 } from "uuid";
// import localImage from '../buildings/banana-peel.png';
// import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
// const handleUpload = async () => {
//     try {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const imgId = v4();
//           const imgRef = ref(imgDB, `Imgs/${imgId}`);
 
//           const response = await fetch(localImage);
//           const blob = await response.blob();
  
//           const uploadTaskSnapshot = await uploadBytes(imgRef, blob);
//           const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
//           resolve(downloadURL);
  
//         } catch (error) {
//           reject(error);
//           console.error('Error uploading image:', error.message);
//         }
//       });
//     } catch (error) {
//       throw error;
//     }
//   };