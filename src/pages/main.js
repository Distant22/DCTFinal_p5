import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import NameInput from '../components/name';
import Options from '../components/Options';
import optionData from '../options/option.json';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { imgDB, txtDB } from "../firebase";
import { v4 } from "uuid";
import localImage from '../buildings/banana-peel.png';
import ReactLoading from 'react-loading';

function Main() {
  
  const [imageUrl, setImageUrl] = useState('');
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);
  const [waiting, setWaiting] = useState(true);

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0
  })

  const handleNameSubmit = (val) => {
    setUser({...user, name: val});
  };

  const handleResult = (val) => {
    setResult(val)
  }

  const handleAddScore = (val) => {
    setUser({...user, score: user.score + val});
  }

  const handleUpload = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          const imgId = v4();
          const imgRef = ref(imgDB, `Imgs/${imgId}`);
 
          const response = await fetch(localImage);
          const blob = await response.blob();
  
          const uploadTaskSnapshot = await uploadBytes(imgRef, blob);
          const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
          resolve(downloadURL);
  
        } catch (error) {
          reject(error);
          console.error('Error uploading image:', error.message);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (result) {
      const timeout = setTimeout( async () => {
          try {
              const downloadURL = await handleUpload();
              const docRef = await addDoc(collection(txtDB, 'users'), {...user, imgUrl: downloadURL});
              console.log('Document ID:', docRef.id);
              await getImageUrl();
      
            } catch (error) {
                console.error('Error adding user data:', error);
            }
      }, 3000);

      return () => clearTimeout(timeout);
    } 
  }, [result, user]);

  useEffect(() => {
    const waitBeforeRender = setTimeout(() => {
      setWaiting(false);
    }, 2200);

    return () => clearTimeout(waitBeforeRender);
  }, []);

  const getImageUrl = async () => {
    try {
      const imgRef = ref(imgDB, `Imgs/apple.jpg`);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);
    } catch (error) {
      console.error('Error getting image:', error);
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
                </> : 
                <>  
                  <Options options={options} onChooseOption={handleAddScore} onResult={handleResult} />
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
