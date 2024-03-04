import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import NameInput from './components/name';
import Options from './components/Options';
import optionData from './options/option.json';
import P5Sketch from './components/sketch';

function App() {
  
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const sendData = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/draw', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": user.name,
              "score": user.score
            })
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Success:', data);
        } catch (error) {
          console.error('There was a problem with your fetch operation:', error);
        }
      };
  
      if (result) {
        await sendData();
      }
    };
  
    fetchData();
  }, [result, user.name, user.score]);
  
  

  return (
    <div className="flex flex-col h-screen overflow-y-hidden font-serif">
      <Header />
      <div className={`h-[70%] p-2 mx-2 rounded-xl font-bold flex flex-col items-center justify-center`}>

        {user.name === "" ?
          <NameInput onNameSubmit={handleNameSubmit} /> :<>
            {result ? 
              <>
                <p className="text-sm"> 使用者 {user.name} 的分數是 {user.score}</p>
                <P5Sketch userInput={150} />
              </> : <>  
                  <Options options={options} onChooseOption={handleAddScore} onResult={handleResult} />
              </>
            }
          </>
        }

      </div>
      <Footer />
    </div>
  );
}

export default App;
