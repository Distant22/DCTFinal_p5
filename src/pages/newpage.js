import React, { useState, useEffect, useRef } from 'react';
import NameInput from '../components/name';
import Options from '../components/Options';
import optionData from '../options/option.json';
import {ref, getDownloadURL} from "firebase/storage";
import { getDoc, addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { imgDB, txtDB } from "../firebase";
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
import Message from '../components/message';
// import {uploadBytes} from "firebase/storage";
// import originAudio from '../music/origin.mp3';

function NewPage() {
  
  const [imageUrl, setImageUrl] = useState('');
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const [lock, setLock] = useState(false);
  const audioRef = useRef(null);

  const [page, setPage] = useState("init")

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
    setPage(val)
  };

  const handleResult = (val) => {
    setResult(val)
  }

  // 建築物集合
  // 200 也可給其他小裝飾
  // const img_dict = {
  //   "banana": 0,
  //   "bank": 100,
  //   "car": 200,
  //   'residence': 300,
  //   'church': 400,
  //   'hamburger': 500,
  //   'school': 600,
  //   "television": 700,
  //   "skybuilding": 800,
  //   "factory": 900,
  //   "drink": 1000,
  //   "park": 1100,
  //   "temple": 1200
  // };

  // TODO : 暫時用香蕉替代所有還沒上傳的建築物
  const img_dict = {
    "banana": 0,
    "bank": 100,
    "banana": 200,
    'residence': 300,
    'church': 400,
    'hamburger': 500,
    'banana': 600,
    "television": 700,
    "skybuilding": 800,
    "banana": 900,
    "banana": 1000,
    "banana": 1100,
    "temple": 1200
  };

  // 指定顏色和建築物字串串接，組成照片名稱
  const color_dict = [
    "-black-and-white",
    "-blue",
    "-brown",
    "-green",
    "-origin",
    "-pink"
  ]

  const handleUpdateUser = (val) => {
    console.log("這次加的分數 - ",val)
    let imgType = 'banana-origin';
    for (const key in img_dict) {
      if (img_dict[key] === user.score+val) {
        // TODO : 先暫時寫死顏色為 origin
        imgType = key + "-origin";
        console.log("將圖片決定為",imgType)
      } 
    }
    setUser({...user, 
      score: user.score + val, 
      uploadTime: serverTimestamp(),
      imgType: imgType
    });
  }

  // 從 Firebase 把對應的建築物載下來
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const imgRef = ref(imgDB, `${user.imgType}.png`);
        const url = await getDownloadURL(imgRef);
        setImageUrl(url);
      } catch (error) {
        setError(true)
        console.log("載入圖片發生錯誤：",error)
      }
    };

    // 將使用者資料上傳到 Firebase
    if (result && !lock) {
      setLock(true)
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

  // 不同的分數區間對應的音樂列表
  const audioThresholds = [
    { threshold: 1100, audio: "hopeless" },
    { threshold: 990, audio: "sad" },
    { threshold: 880, audio: "collapse" },
    { threshold: 770, audio: "suicide" },
    { threshold: 660, audio: "depression" },
    { threshold: 550, audio: "mild" },
    { threshold: 440, audio: "satisfy" },
    { threshold: 330, audio: "yes" },
    { threshold: 220, audio: "sunny" },
    { threshold: 110, audio: "cheer" },
    { threshold: 0, audio: "happy" }
  ];
  
  // 看分數在哪個區間，就放哪個音樂
  const getAudioSource = () => {
    for (let i = 0; i < audioThresholds.length; i++) {
      if (user.score >= audioThresholds[i].threshold) {
        console.log("Playing Audio:", audioThresholds[i].audio);
        musicSelectedNum = i;
        return allAudio[i];
      }
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
    <div className="flex font-serif duration-500">
        { page === "init" ? <NameInput onNameSubmit={handleNameSubmit} /> : <></>}
        { page === "message" ? <Message onNameSubmit={handleNameSubmit} /> : <></>}
    </div>
  );
}

export default NewPage;
