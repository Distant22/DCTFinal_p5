import React, { useState, useEffect, useRef } from 'react';
import Options from '../components/Options';
import optionData from '../options/option.json';
import { serverTimestamp } from "firebase/firestore";
// import {uploadBytes} from "firebase/storage";
// import originAudio from '../music/origin.mp3';

function Main({ nameProp, setResult }) {
  
  const [options] = useState(optionData);
  const [waiting, setWaiting] = useState(true);
  const [upload, setUpload] = useState(false);
  const audioRef = useRef(null);

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0,
    uploadTime: null,
    imgType: null
  })

  const handleResult = (val) => {
    setUpload(val)
    setResult(user)
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

  // 進入頁面前先等待幾秒跑動畫
  useEffect(() => {
    const waitBeforeRender = setTimeout(() => {
      setWaiting(false);
    }, 1000);
    setUser({...user, 
        name: nameProp.nameProp
    });
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

  return (
    <div className={`${(waiting || upload) ? "opacity-0" : "opacity-100"} w-screen duration-300 flex flex-col h-screen overflow-y-hidden font-serif relative bg-[#62a1b6]`}>
      <div className="h-[100%] duration-700 ease-in-out font-bold flex flex-col items-center justify-center relative">
        <div className={`w-[90%] h-full flex flex-col items-center justify-center duration-700 ease-in-out ${waiting ? "opacity-0" : "opacity-100"}`}>
          <>
            <Options options={options} onChooseOption={handleUpdateUser} onResult={handleResult} />
          </>
        </div>
      </div>
    </div>
  );
}

export default Main;
