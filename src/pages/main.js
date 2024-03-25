import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import NameInput from '../components/name';
import Options from '../components/Options';
import optionData from '../options/option.json';
import {ref, getDownloadURL} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { imgDB, txtDB } from "../firebase";
import ReactLoading from 'react-loading';

function Main() {
  
  const [imageUrl, setImageUrl] = useState('');
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);
  const [waiting, setWaiting] = useState(true);
  var img_list = ['bank-green','hamburger-blue','residence-brown','temple-origin']

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

  const handleUpdateUser = (val) => {
    var new_score = user.score + val
    console.log("Updated - score = ",user.score)
    console.log("Image Type - ",(new_score/100))
    setUser({...user, 
      score: new_score, 
      uploadTime: serverTimestamp(),
      imgType: img_list[(new_score/100)-1]
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
