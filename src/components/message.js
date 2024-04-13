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

function Message({ onNameSubmit }) {

  const [text, setText] = useState("");
  const [message , setMessage] = useState([])
  const messageEndRef = useRef(null); 

  const handleSendText = (val) => {
    if ( val !== "") {
        setMessage([...message, val])
        setText("")
    }
  }

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  // const handleSubmit = () => {
  //   if ( (name.length > 8) || (name.trim() === "") ) {
  //     setError(true)
  //   } else {
  //     setError(false);
  //     onNameSubmit(name);
  //   }
  // };
  // useEffect(() => {
  //   if ( name.length > 8 ){
  //     setError(true);
  //     console.log("name too long")
  //   } else {
  //     setError(false);
  //     console.log("name fine")
  //   } 
  // },[name])

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">

      {/* 頂端美編 */}
      <p className="h-[5%] w-full flex items-end space-x-2 bg-[#F5F5F5]">
        <p className='w-[2%]' />
        <img className="h-[30%]" src={Phonetime} />
        <p className='w-[60%]' />
        <img className="h-[30%]" src={Wifi} />
        <img className="h-[30%]" src={Fourg} />
        <img className="h-[30%]" src={Batteries} />
      </p>

      {/* 上排版 */}
      <p className='h-[15%] w-full bg-[#F5F5F5] flex justify-start items-start'>
        <img className="h-[20%] w-[11%] mt-7 ml-4 lg:w-[5%] " src={Messagecount} />
        <p className="w-[15.2%]" />
        <p className="w-[39%] h-full  flex flex-col items-center justify-center">
            <img className="h-[50%] hover:h-[60%] duration-300" src={Banner} />
            <p className='h-[25%] flex space-x-1 mt-2'>
                <p className='h-full text-xs text-gray-700'>+886 005-070-512</p>
                <img src={Arrow} className='mt-1 h-[40%]' />
            </p>
        </p>
      </p>


      {/* 下排版 */}
      <p className='h-[73%] w-[90%] flex flex-col overflow-y-scroll my-2'>
        {message.map((item, index) => (
            <div className="chat chat-end">
                <div className='chat-bubble duration-300 hover:bg-blue-400 bg-gray-300 text-gray-800'>{item}</div>    
            </div>
        ))}
        <div ref={messageEndRef}></div>
      </p>

      <p className="h-[7%] w-full flex items-start space-x-1 ">
        <p className='w-[1%]' />
        <img className="hover:h-[68%] hover:-translate-y-1 duration-300 h-[63%] mt-1" src={Camera} />
        <img className="hover:h-[83%] hover:-translate-y-1 duration-300 h-[78%]" src={Appstore} />
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
            placeholder="請在此輸入你的暱稱" 
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

export default Message;


// 62A1B6