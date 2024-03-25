import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import NameInput from '../components/name';
import Options from '../components/Options';
import optionData from '../options/option.json';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { getDoc, addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { imgDB, txtDB } from "../firebase";
import ReactLoading from 'react-loading';
import originAudio from '../music/origin.mp3';
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


function Main() {
  
  const [imageUrl, setImageUrl] = useState('');
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const audioRef = useRef(null);

  const allAudio = [hopelessAudio, sadAudio, collapseAudio, suicideAudio, depressionAudio, mildAudio, satisfyAudio, yesAudio, sunnyAudio, cheerAudio, happyAudio];
  const allAudioName = ['hopeless','sad','collapse','suicide','depression','mild','satisfy','yes','sunny','cheer','happy'];
  let musicSelectedNum;

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0,
    uploadTime: null,
    imgType: null
  })

  const handleNameSubmit = (val) => {
    setUser({...user, name: val});
  };

  const handleResult = (val) => {
    setResult(val)
  }

  var img_list = ['bank-green','hamburger-blue','residence-brown','temple-origin']

  const handleUpdateUser = (val) => {
    var new_score = user.score + val
    console.log("Updated - score = ",user.score)
    console.log("Image Type - ",(new_score/100))
    // imgType: img_list[(new_score/100)-1]
    setUser({...user, 
      score: new_score, 
      uploadTime: serverTimestamp(),
      imgType: img_list[1]
    });
  }

  // 上傳資料到 Firebase
  useEffect(() => {

    const getImageUrl = async () => {
      try {
        const imgRef = ref(imgDB, `${user.imgType}.png`);
        const url = await getDownloadURL(imgRef);
        setImageUrl(url);
      } catch (error) {
        console.error('Error getting image:', error);
      }
    };

    if (result) {
      const timeout = setTimeout( async () => {
          try {
              console.log("上傳資料中...User is ",user)
              const docRef = await addDoc(collection(txtDB, 'users'), {...user});
              console.log('Document ID:', docRef.id);
              await getImageUrl();

              await updateFirestoreTimestamp();
      
            } catch (error) {
                console.error('Error adding user data:', error);
            }
      }, 3000);
      return () => clearTimeout(timeout);
    } 
  }, [result, user]);

  // 進入頁面前先等待幾秒跑動畫
  useEffect(() => {
    const waitBeforeRender = setTimeout(() => {
      setWaiting(false);
    }, 2200);

    return () => clearTimeout(waitBeforeRender);
  }, []);

  useEffect(() => {
    // Automatically play the audio when the component mounts
    const audioPlayer = audioRef.current;
    if (audioPlayer) {
      audioPlayer.play();
    }
  
    // Pause the audio when the component unmounts
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
      }
    };
  }, []);

  // Determine which audio to play based on the score
  const getAudioSource = () => {
    if (user.score >= 1200) {
      console.log("Playing Audio 'hopeless'");
      musicSelectedNum = 0;
      return allAudio[0];
    } else if (user.score >= 1050) {
      console.log("Playing Audio 'sad'");
      musicSelectedNum = 1;
      return allAudio[1];
    } else if (user.score >= 900) {
      console.log("Playing Audio 'collapse'");
      musicSelectedNum = 2;
      return allAudio[2];
    } else if (user.score >= 750) {
      console.log("Playing Audio 'suicide'");
      musicSelectedNum = 3;
      return allAudio[3];
    } else if (user.score >= 600) {
      console.log("Playing Audio 'depression'");
      musicSelectedNum = 4;
      return allAudio[4];
    } else if (user.score >= 450) {
      console.log("Playing Audio 'mild'");
      musicSelectedNum = 5;
      return allAudio[5];
    } else if (user.score >= 300) {
      console.log("Playing Audio 'satisfy'");
      musicSelectedNum = 6;
      return allAudio[6];
    } else if (user.score >= 150) {
      console.log("Playing Audio 'yes'");
      musicSelectedNum = 7;
      return allAudio[7];
    } else if (user.score >= 0) {
      console.log("Playing Audio 'sunny'");
      musicSelectedNum = 8;
      return allAudio[8];
    } else if (user.score >= -150) {
      console.log("Playing Audio 'cheer'");
      musicSelectedNum = 9;
      return allAudio[9];
    } else if (user.score >= -300) {
      console.log("Playing Audio 'happy'");
      musicSelectedNum = 10;
      return allAudio[10];
    }
  };

  // Function to update Firestore document timestamp when music is selected
  const updateFirestoreTimestamp = async () => {
    try {
      const docRef = doc(txtDB, 'music', allAudioName[musicSelectedNum]);
      const docSnapshot = await getDoc(docRef);
      const currentTime = docSnapshot.data().time;
      await updateDoc(docRef, {
        time: currentTime + 1
      });
      console.log('Firestore updated time successfully.');
    } catch (error) {
      console.error('Error updating Firestore time:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-hidden font-serif relative">
      <Header />
      <div className="h-[70%] duration-700 ease-in-out font-bold flex flex-col items-center justify-center relative">
        <ReactLoading 
          className={`absolute w-full h-full duration-300 ease-in-out ${waiting ? "opacity-100" : "opacity-0"}`} 
          type={"bubbles"} 
          color={'#90E0EF'} 
          height={300} 
          width={300} 
        /> 
        <div style={{ zIndex: waiting ? -1 : 10 }} className={`w-[90%] h-full duration-700 ease-in-out ${waiting ? "opacity-0" : "opacity-100"}`}>
          {user.name === "" ? (
            <NameInput onNameSubmit={handleNameSubmit} />
          ) : (
            <>
              {result ? 
                <>
                  <p className="text-sm"> 使用者 {user.name} 的分數是 {user.score}</p>
                  {imageUrl ? <img src={imageUrl} alt="" /> : <>載入結果中...</>}   
                  <audio ref={audioRef} autoPlay loop>
                    <source src={getAudioSource()} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>             
                </> : 
                <>  
                  <Options options={options} onChooseOption={handleUpdateUser} onResult={handleResult} />
                </>
              }
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
