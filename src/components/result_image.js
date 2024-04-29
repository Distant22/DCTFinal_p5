
import React, { useEffect, useState, } from 'react';
import {ref, getDownloadURL} from "firebase/storage";
import { imgDB } from "../firebase";

function ResultImage({ userProp, colorProp }) {

  const [imageUrl, setImageUrl] = useState('');

  const colorVariants = {
    blue: 'bg-[#F2F5F9]',
    pink: 'bg-[#FFF8F8]',
    brown: 'bg-[#F8F6F4]',
    black_and_white: 'bg-[#F5F5F5]',
    green: 'bg-[#FCFFF6]'
  }

  const getImageUrl = async () => {
    try {
      const imgRef = ref(imgDB, `/result/${userProp.imgType}.png`);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);
    } catch (error) {
      console.log("載入圖片發生錯誤：",error)
    }
  };

  useEffect(() => {
    const waitBeforeRender = setTimeout(() => {
      try {
        console.log("正在抓取資料：")
        getImageUrl();
        console.log("測試 Color : ",colorVariants[colorProp])
      } catch (error) {
        console.error('Error adding user data:', error);
      }
    }, 100);
    return () => clearTimeout(waitBeforeRender);
  }, []);

  return (
    <div className={`h-dvh w-screen ${colorVariants[colorProp]} flex items-center justify-center`}>
      <img src={imageUrl} className="object-scale-down h-full w-full" alt="" />     
    </div>
  );

}

export default ResultImage;


