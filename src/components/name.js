import {React, useState, useEffect, useRef} from 'react';
import Airdrop from '../page_item/Airdrop.png';
import Phonetime from '../page_item/phonetime.png'
import Fourg from '../page_item/fourg.png'
import Wifi from '../page_item/wifi.png'
import Batteries from '../page_item/batteries.png'


function NameInput({ onChangePage }) {

  const [waiting, setWaiting] = useState(true);
  const [secretMsg, setSecretMsg] = useState(false);
  const divRef = useRef(null);
  const targetElementRef = useRef(null); 

  const changePage = (val) => {
    onChangePage(val)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target !== targetElementRef.current) {
        setSecretMsg(false)
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const waitBeforeRender = setTimeout(() => {
      setWaiting(false);
    }, 1000);
    return () => clearTimeout(waitBeforeRender);
  }, []);

  return (
    <div ref={divRef} className="flex flex-col h-full w-screen items-center justify-center bg-[#62A1B6]">

      {/* 頂端美編 */}
      <p className="h-[5%] w-full flex items-end space-x-2 ">
        <p className='w-[2%]' />
        <img className="h-[30%]" alt="Phonetime" src={Phonetime} />
        <p className='w-[60%] ' />
        <img className="h-[30%]" alt="Wifi" src={Wifi} />
        <img className="h-[30%]" alt="FourG" src={Fourg} />
        <img className="h-[30%]" alt="Batteries" src={Batteries} />
      </p>

      {/* 上排版 */}
      <p className='h-[53.7%]'></p>

      <p className='h-[6.5%] w-full flex'>
        <p className="w-[23%]"></p>
        <p style={{zIndex: 100}} ref={targetElementRef} onClick={() => setSecretMsg(!secretMsg)} className="bg-gray-50 h-full w-[26.9%] opacity-0">2</p>
        <p style={{zIndex: 100}} onClick={() => changePage("message")} className="bg-red-400 h-full w-[26.9%] opacity-0">3</p>
        <p className="w-[23%]"></p>
      </p>
      <img alt="Airdrop" src={Airdrop} className={`${ waiting ? "opacity-0" : "opacity-100" } h-[30%] absolute duration-700`} />

      {/* 下排版 */}
      <p className={`${secretMsg === false ? "translate-y-24 opacity-0" : "translate-y-12 opacity-100" } duration-500 text-gray-600 w-24 h-8 rounded-md bg-green-400 flex items-center justify-center`}>:(</p>
      <p className='h-[34.8%]'></p>
    </div>
  );

}

export default NameInput;


// 62A1B6