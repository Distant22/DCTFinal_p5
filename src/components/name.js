import React, { useEffect, useState } from 'react';
import Airdrop from '../page_item/Airdrop.png';
import Phonetime from '../page_item/phonetime.png'
import Fourg from '../page_item/fourg.png'
import Wifi from '../page_item/wifi.png'
import Batteries from '../page_item/batteries.png'


function NameInput({ onNameSubmit }) {

  const [error, setError] = useState(false);

  // const handleSubmit = () => {
  //   if ( (name.length > 8) || (name.trim() === "") ) {
  //     setError(true)
  //   } else {
  //     setError(false);
  //     onNameSubmit(name);
  //   }
  // };

  const enterNextPage = (val) => {
    onNameSubmit(val)
  }

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
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-[#62A1B6]">

      {/* 頂端美編 */}
      <p className="h-[5%] w-full flex items-end space-x-2">
        <p className='w-[2%]' />
        <img className="h-[30%]" src={Phonetime} />
        <p className='w-[60%]' />
        <img className="h-[30%]" src={Wifi} />
        <img className="h-[30%]" src={Fourg} />
        <img className="h-[30%]" src={Batteries} />
      </p>

      {/* 上排版 */}
      <p className='h-[53.7%]'></p>

      <p className='h-[6.5%] w-full flex'>
        <p className="w-[23%]"></p>
        <p style={{zIndex: 100}} onClick={() => enterNextPage("init")} className="bg-gray-50 h-full w-[26.9%] opacity-0">2</p>
        <p style={{zIndex: 100}} onClick={() => enterNextPage("message")} className="bg-red-400 h-full w-[26.9%] opacity-0">3</p>
        <p className="w-[23%]"></p>
      </p>
      <img src={Airdrop} className="h-[30%] absolute opacity-100" />

      {/* 下排版 */}
      <p className='h-[34.8%]'></p>
    </div>
  );

}

export default NameInput;


// 62A1B6