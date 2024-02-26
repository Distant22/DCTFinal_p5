import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import P5Sketch from './components/sketch';

function App() {

  const [options] = useState([
    {
      problem: 'Joe 更新進度',
      choices: ["開心", "難過", "生氣", "沒有情緒"],
    },
    {
      problem: '你最喜歡的季節是什麼？',
      choices: ["春天", "夏天", "秋天", "冬天"],
    },
    {
      problem: '如果你能夠實現一個願望，你會想許什麼？',
      choices: ["財富自由", "一生平安", "事業成功", "活得自在"],
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
      }
      setSubmitted(false);
      setChoice("")
    }
    console.log("You set submit to", submitted);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-hidden font-serif">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
