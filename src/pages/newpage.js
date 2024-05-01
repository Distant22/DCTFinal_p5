import React, { useState } from 'react';
import NameInput from '../components/name';
import Message from '../components/message';
import Result from '../components/result';
import ResultImage from '../components/result_image';
import Main from './main';

function NewPage() {

  const [page, setPage] = useState("init")

  const [color, setColor] = useState('black_and_white');

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0,
    uploadTime: null,
    imgType: null,
    chosenOption: [],
  })

  const handleChangePage = (val) => {
    setPage(val)
    if(val === "init") {
      console.log("Reset Everything")
      setUser({...user,
        name: "",
        imgType: null,
        score: 0,
        uploadTime: null,
        chosenOption: [],
      })
    } else {
      if ( user.imgType !== null ){
        let len = user.imgType.length
        if ( user.imgType.substring(len - 4, len) === "blue" ) {
          console.log("Set color to blue")
          setColor("blue")
        } else if ( user.imgType.substring(len - 4, len) === "pink") {
          console.log("Set color to pink")
          setColor("pink")
        } else if ( user.imgType.substring(len - 5, len) === "brown"){
          console.log("Set color to brown")
          setColor("brown")
        } else if ( user.imgType.substring(len - 5, len) === "green"){
          console.log("Set color to green")
          setColor("green")
        }
      }
    }
  };

  const handleUserName = async (val) => {
    const sleep = ms => new Promise(
      r => setTimeout(r, ms)
    );
    await sleep(1000)
    setUser({...user,
      name: val
    })
    setPage("main")
  }

  const handleResult = async (val) => {
    const sleep = ms => new Promise(
      r => setTimeout(r, ms)
    );
    await sleep(1000)
    setUser({...user,
      imgType: val.imgType,
      score: val.score,
      uploadTime: val.uploadTime,
      chosenOption: val.chosenOption,
    })
    setPage("result")
  }

  return (
    <div className="flex font-sans font-bold duration-500 h-[100dvh] ">
        { page === "init" ? <NameInput onChangePage={handleChangePage} /> : <></>}
        { page === "message" ? <Message onNameSubmit={handleUserName} /> : <></>}
        { page === "main" ? <Main nameProp={user.name} setResult={handleResult} /> : <></>}
        { page === "result" ? <Result userProp={user} onRestart={handleChangePage} /> : <></>}
        { page === "result_image" ? <ResultImage userProp={user} colorProp={color} /> : <></>}
    </div>
  );
}

export default NewPage;
