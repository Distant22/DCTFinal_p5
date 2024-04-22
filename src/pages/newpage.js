import React, { useState } from 'react';
import NameInput from '../components/name';
import Message from '../components/message';
import Result from '../components/result';
import ResultImage from '../components/result_image';
import Main from './main';

function NewPage() {

  const [page, setPage] = useState("init")

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
    setUser({...user,
      name: "",
      imgType: null,
      score: 0,
      uploadTime: null,
      chosenOption: [],
    })
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
    <div className="flex font-serif duration-500 h-[100dvh] ">
        { page === "init" ? <NameInput onChangePage={handleChangePage} /> : <></>}
        { page === "message" ? <Message onNameSubmit={handleUserName} /> : <></>}
        { page === "main" ? <Main nameProp={user.name} setResult={handleResult} /> : <></>}
        { page === "result" ? <Result userProp={user} onRestart={handleChangePage} /> : <></>}
        { page === "result_image" ? <ResultImage /> : <></>}
    </div>
  );
}

export default NewPage;
