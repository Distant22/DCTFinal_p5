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
  const [name, setName] = useState("")
  const [fade, setFade] = useState(false)
  const messageEndRef = useRef(null); 

  // 不同的 State : Name , Confirm
  const [state, setState] = useState("Name")

  const handleSendText = async (val) => {

    // 把使用者輸入的字記錄到聊天室中
    if ( val !== "" ){
      setText("")
      setMessage([...message, {
        side: "right",
        text: val
      }])
    }

    if ( val !== "" && state === "Name" ) {
      setName(val)
      setState("Confirm")
      if ( val.length <= 8 ) {
        setMessage([...message, {
          side: "right",
          text: val
        },{
          side: "left",
          text: "你設定的名稱是「" + val + "」。\n 確定名稱的話請輸入 Yes 開始測驗，更改名稱的話請輸入 No。"
        }])
      } else {
        setState("Name")
        setMessage([...message, {
          side: "right",
          text: val
        },{
          side: "left",
          text: "名稱不能夠超過 8 個字。"
        }])
      }
    }
    
    if ( val !== "" && state === "Confirm" ) {
      if ( val === "Yes" ) {
        const sleep = ms => new Promise(
          r => setTimeout(r, ms)
        );
        await sleep(500)
        setFade(true)
        onNameSubmit(name)
      } else if ( val === "No" ) {
        setState("Name")
        setMessage([...message, {
          side: "left",
          text: "請輸入你的暱稱。"
        }])
      }
    }
  }

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div className={` ${fade ? "opacity-0" : "opacity-100"} duration-300 flex flex-col h-full w-screen items-center justify-center`}>

      {/* 頂端美編 */}
      <p className="h-[5%] w-full flex items-end space-x-2 bg-[#F5F5F5]">
        <p className='w-[2%]' />
        <img className="h-[30%]" alt="Phonetime" src={Phonetime} />
        <p className='w-[60%]' />
        <img className="h-[30%]" alt="Wifi" src={Wifi} />
        <img className="h-[30%]" alt="FourG" src={Fourg} />
        <img className="h-[30%]" alt="Batteries" src={Batteries} />
      </p>

      {/* 上排版 */}
      <p className='h-[15%] w-full bg-[#F5F5F5] flex justify-start items-start'>
        <img className="h-[20%] w-[11%] mt-7 ml-4 lg:w-[5%] "alt="Msgcount"  src={Messagecount} />
        <p className="w-[15.2%]" />
        <p className=" w-[39%] h-full  flex flex-col items-center justify-center">
            <img className="h-[50%] hover:h-[60%] duration-300" alt="Banner" src={Banner} />
            <p className='h-[25%] flex space-x-1 mt-2'>
                <p className='w-full h-full text-xs text-gray-700'>+886 005-070-512</p>
                <img alt="Arrow" src={Arrow} className=' mt-1 h-[40%]' />
            </p>
        </p>
      </p>


      {/* 下排版 */}
      <div className='h-[73%] w-[90%] flex flex-col overflow-y-scroll my-2'>
        <div className="chat chat-start">
          <div className='chat-bubble duration-300 bg-gray-200 text-gray-800'>請輸入你的暱稱</div>    
        </div>
        {message.map((item, index) => (
            <div key={index} className={`chat ${ item.side === "right" ? "chat-end" : "chat-start"}`}>
                <div className={`chat-bubble duration-300 ${ item.side === "right" ? "bg-blue-200 hover:bg-blue-400" : "bg-gray-200" }  text-gray-800`}>{item.text}</div>    
            </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <p className="h-[7%] w-full flex items-start space-x-1 relative ">
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
            placeholder="請在此輸入你的暱稱" 
            maxLength={12}
            className='duration-500 pl-4 text-sm w-[72%] h-[76%] rounded-full border-2 border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-0 text-black placeholder-gray-400'
        />
      </p>
    </div>
  );

}

export default Message;


// 62A1B6