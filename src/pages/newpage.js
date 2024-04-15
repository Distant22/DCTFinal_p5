import React, { useState } from 'react';
import NameInput from '../components/name';
import Message from '../components/message';
import Result from '../components/result';
import Main from './main';

function NewPage() {

  const [page, setPage] = useState("init")

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0,
    uploadTime: null,
    imgType: null
  })

  const handleChangePage = (val) => {
    setPage(val)
    setUser({...user,
      name: "",
      imgType: null,
      score: 0,
      uploadTime: null
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
      uploadTime: val.uploadTime
    })
    setPage("result")
  }

  return (
    <div className="flex font-serif duration-500 h-[100dvh] ">
        { page === "init" ? <NameInput onChangePage={handleChangePage} /> : <></>}
        { page === "message" ? <Message onNameSubmit={handleUserName} /> : <></>}
        { page === "main" ? <Main nameProp={user.name} setResult={handleResult} /> : <></>}
        { page === "result" ? <Result userProp={user} onRestart={handleChangePage} /> : <></>}
    </div>
  );
}

export default NewPage;
