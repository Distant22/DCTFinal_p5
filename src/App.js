import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import P5Sketch from './components/sketch';
import Login from './components/login';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [options] = useState([
    {
      problem: '1. 在一個悠閒的一天，你花費多少時間在網路上閱讀新聞或使用社群媒體？',
      choices: ["A. 小於 30 分鐘", "B. 30 分鐘至 1 小時", "C. 1 小時至 2 小時", "D. 2 小時以上"],
    },
    {
      problem: '2. 你在網路上參與討論或留言的頻率？',
      choices: ["A. 從不", "B. 偶爾", "C. 經常", "D. 總是"],
    },
    {
      problem: '3. 當你在網路上看到有爭議性的新聞或意見時，你的第一反應是？',
      choices: ["A. 不太在意，直接忽略", "B. 覺得有趣，想深入了解", "C. 覺得有點擔憂，但不一定相信", "D. 非常擔憂，立刻分享或評論"],
    },
    {
      problem: '4. 你曾因為在網路上看到的資訊改變過自己的觀點嗎？',
      choices: ["A. 不確定", "B. 是的，多次", "C. 是的，偶爾", "D. 不曾改變過"],
    },
    {
      problem: '5. 當你在網路上看到與自己觀點相左的言論時，你的反應是？',
      choices: ["A. 忽略並捲動頁面", "B. 嘗試理解對方觀點", "C. 感到憤怒或不悅", "D. 回擊或發表相對立的言論"],
    },
    {
      problem: '屬於你的建築物是：',
      choices: []
    }
  ]);

  const [choice, setChoice] = useState("");
  const [count, setCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([...options[count].choices]);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleOptionClick = (val) => {
    if (!submitted) {
      setSelectedOptions([...selectedOptions]);
      setChoice(val)
    }
  };

  const handleSubmit = () => {

    if (choice === "" &&  count + 1 < options.length) {

      setAlert(true)
    
    } else if (!submitted) {

      setAlert(false)
      setSubmitted(true);
      setCount(prevCount => (count + 1 < options.length) ? prevCount + 1 : 0 ); // Increment count using a function
      if (count + 1 < options.length) {
        setSelectedOptions([...options[count + 1].choices]);
      } else {
        setSelectedOptions([...options[0].choices]);
        setIsAuthenticated(false); // go back to the login page
      }
      setSubmitted(false);
      setChoice("");
      
    }
    console.log("You set submit to", submitted);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-hidden font-serif">
      <Header />

      {/* Conditionally render either the Login component or the existing questionnaire component */}
      {isAuthenticated ? (
        <div className={`duration-700 h-[70%] p-2 mx-2 rounded-xl font-bold flex flex-col items-center justify-center`}>
          <div className={`text-lg py-4 space-y-3 flex flex-col w-full ${ selectedOptions.length > 0 ? "items-start pl-4" : "items-center justify-center h-full " }`}>
            <p>{options[count].problem}</p>
            { selectedOptions.length > 0 ? <></> : 
            <>
              <p className="text-sm">（尚未完成，僅測試可連上 p5）</p>
              <P5Sketch userInput={150} />
              <button
                className="w-24 h-12 text-lg bg-black rounded-md text-white active:bg-yellow-300 active:text-black bg-black"
                onClick={handleSubmit}
              >
                回首頁
              </button> 
            </>
            }
          </div>
          <div className={`flex flex-col space-y-3 w-full ${ selectedOptions.length > 0 ? "h-[80%] m-4" : "h-[0%]" }`}>
            {selectedOptions.map((val, index) => (
              <button
                key={index}
                className={`w-[100%] h-[30%]  duration-500 rounded-md hover:bg-gray-300 focus:(bg-gradient-to-r from-purple-300 to-blue-400) hover:text-black
                ${choice === val ? 'bg-gradient-to-r from-purple-300 to-blue-400  text-black opacity-100' : 'bg-gray-800 text-white opacity-100'}`}
                onClick={() => handleOptionClick(val)}
              >
                {val}
              </button>
            ))}
          </div>
          <div className={`flex justify-end w-full items-center ${ selectedOptions.length > 0 ? "h-[20%] m-4" : "h-[0%]" }`}>
            { (alert && selectedOptions.length > 0) ? <p className="text-red-600 h-full pr-4 flex items-center">記得選擇選項！</p> : <></>}
            { selectedOptions.length > 0 ? <button
              className={`h-[70%] w-[50%] duration-300 rounded-md text-white active:bg-yellow-300 active:text-black hover:text-black hover:bg-yellow-300 bg-gray-800 text-white`}
              onClick={handleSubmit}
            >
              送出
            </button> : 
            <></>}
          </div>
        </div>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}

      <Footer />
    </div>
  );
}

export default App;
