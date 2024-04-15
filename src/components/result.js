import React, { useEffect, useState, useRef } from 'react';
import Phonetime from '../page_item/blackphonetime.png'
import Fourg from '../page_item/blackfourg.png'
import Wifi from '../page_item/blackwifi.png'
import Batteries from '../page_item/blackbatteries.png'
import Camera from '../page_item/camera.png'
import Appstore from '../page_item/appstore.png'
import Messagecount from '../page_item/messagecount.png'
import Banner from '../page_item/banner.png'
import Arrow from '../page_item/arrow.png'
import Button from '../page_item/button.png'
import {ref, getDownloadURL} from "firebase/storage";
import { imgDB, txtDB } from "../firebase";
import { getDoc, addDoc, collection, doc, updateDoc } from "firebase/firestore";
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

function Result({ userProp, onRestart }) {

  const allAudio = [hopelessAudio, sadAudio, collapseAudio, suicideAudio, depressionAudio, mildAudio, satisfyAudio, yesAudio, sunnyAudio, cheerAudio, happyAudio];
  const allAudioName = ['hopeless','sad','collapse','suicide','depression','mild','satisfy','yes','sunny','cheer','happy'];


  const [text, setText] = useState("");
  const [message , setMessage] = useState([])
  const [imageUrl, setImageUrl] = useState('');
  const messageEndRef = useRef(null); 
  const audioRef = useRef(null);
  let musicSelectedNum;

  const handleSendText = async (val) => {
    // 把使用者輸入的字記錄到聊天室中
    if ( val !== "" ){
      setText("")
      setMessage([...message, {
        side: "right",
        text: val
      }])
    }

    if ( val === "Restart" ) {
      onRestart("init")
    }
  }

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

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const getImageUrl = async () => {
    try {
      const imgRef = ref(imgDB, `${userProp.imgType}.png`);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);
    } catch (error) {
      console.log("載入圖片發生錯誤：",error)
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  // 進入頁面前先等待幾秒跑動畫
  useEffect(() => {
    const waitBeforeRender = setTimeout(() => {
      try {
        console.log("上傳資料中...User is ", userProp);
        addDoc(collection(txtDB, 'users'), { ...userProp });
        getImageUrl();
        updateFirestoreTimestamp();
      } catch (error) {
        console.error('Error adding user data:', error);
      }
    }, 100);
    return () => clearTimeout(waitBeforeRender);
  }, []);

  useEffect(() => {
    const audioPlayer = audioRef.current;
    if (audioPlayer) {
      audioPlayer.play();
    }
    return () => {
      // if (audioPlayer) {
      //   audioPlayer.pause();
      // }
    };
  }, [])
  
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
        if (userProp.score >= audioThresholds[i].threshold) {
          console.log("Playing Audio:", audioThresholds[i].audio);
          musicSelectedNum = i;
          return allAudio[i];
        }
      }
    };
  
  return (
    <div className={`duration-300 flex flex-col h-screen w-screen items-center justify-center`}>

      {/* 頂端美編 */}
      <p className="h-[5%] w-full flex items-end space-x-2 bg-[#F5F5F5]">
        <p className='w-[2%]' />
        <img className="h-[30%]" alt="Phone" src={Phonetime} />
        <p className='w-[60%]' />
        <img className="h-[30%]" alt="Wifi" src={Wifi} />
        <img className="h-[30%]" alt="FourG" src={Fourg} />
        <img className="h-[30%]" alt="Batteries" src={Batteries} />
      </p>

      {/* 上排版 */}
      <p className='h-[15%] w-full bg-[#F5F5F5] flex justify-start items-start'>
        <img alt="MsgCount" className="h-[20%] w-[11%] mt-7 ml-4 lg:w-[5%] " src={Messagecount} />
        <p className="w-[15.2%]" />
        <p className="w-[39%] h-full  flex flex-col items-center justify-center">
            <img alt="Banner" className="h-[50%] hover:h-[60%] duration-300" src={Banner} />
            <p className='h-[25%] flex space-x-1 mt-2'>
                <p className='w-full h-full text-xs text-gray-700'>+886 005-070-512</p>
                <img alt="Arrow" src={Arrow} className='mt-1 h-[40%]' />
            </p>
        </p>
      </p>


      {/* 下排版 */}
      <p className='h-[73%] w-[90%] flex flex-col overflow-y-scroll my-2'>
        <div className="chat chat-start">
          <div className='chat-bubble duration-300 bg-gray-200 text-gray-800'>使用者 { userProp.name } 的分數是 { userProp.score }</div>    
        </div>
        <div className="chat chat-start">
          <div className='chat-bubble duration-300 bg-gray-200 text-gray-800'>
            <img src={imageUrl} className="rounded-xl bg-gray-200 h-[70%]" alt="" />  
          </div>    
        </div>
        <audio ref={audioRef} autoPlay loop>
          <source src={getAudioSource()} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>    
        {message.map((item, _) => (
            <div className={`chat ${ item.side === "right" ? "chat-end" : "chat-start"}`}>
                <div className={`chat-bubble duration-300 ${ item.side === "right" ? "bg-blue-200 hover:bg-blue-400" : "bg-gray-200" }  text-gray-800`}>{item.text}</div>    
            </div>
        ))}
        <div ref={messageEndRef}></div>
      </p>

      <p className="h-[7%] w-full flex items-start space-x-1 ">
        <p className='w-[1%]' />
        <img alt="Camera" className="hover:h-[68%] hover:-translate-y-1 duration-300 h-[63%] mt-1" src={Camera} />
        <img alt="Appstore" className="hover:h-[83%] hover:-translate-y-1 duration-300 h-[78%]" src={Appstore} />
        <input 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSendText(text);
                }
            }} 
            value={text} 
            onChange={(e) => {
                if (e.target.value.length <= 12) {
                    setText(e.target.value);
                }
            }} 
            placeholder="輸入..." 
            maxLength={12}
            className='duration-500 pl-4 text-sm w-[72%] h-[76%] rounded-full border-2 border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-0 text-black placeholder-gray-400'
        />
        <img 
            onClick={() => handleSendText(text)} 
            className="right-4 bottom-4 h-[3.5%] absolute" 
            src={Button} 
        />
      </p>
    </div>
  );

}

export default Result;


// 62A1B6