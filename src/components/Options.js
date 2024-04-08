import React, { useState }  from 'react';
import question1Pic from '../background-img/question1-pic.png';
import question2Pic from '../background-img/question2-pic.png';
import question3Pic from '../background-img/question3-pic.png';
import question4Pic from '../background-img/question4-pic.png';
import question5Pic from '../background-img/question5-pic.png';
import question6Pic from '../background-img/question6-pic.png';
import question7Pic from '../background-img/question7-pic.png';

const questionBackground = [question1Pic, question2Pic, question3Pic, question4Pic, question5Pic, question6Pic, question7Pic];


function Options({ options, onChooseOption, onResult }) {

    const [alert, setAlert] = useState(false)
    const [choice, setChoice] = useState("");
    const [count, setCount] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([...options[count].choices]);

    const [animation, setAnimation] = useState(false)
    
    const handleOptionClick = (val) => {
        setSelectedOptions([...selectedOptions]);
        setChoice(val)
    };

    const handleSubmit = () => {
        if (choice === "") {
            setAlert(true);
        } else {

            setAnimation(true)

            setTimeout(() => {

                setAnimation(false)
                setAlert(false);
                onChooseOption(options[count].value[choice])
                setCount(prevCount => (count + 1 < options.length) ? prevCount + 1 : 0);
                if (options[count + 1].choices.length === 0){
                    onResult(true)
                } else {
                    setSelectedOptions([...options[count + 1].choices]);
                }
                setChoice("");

            }, 1200);
            
        }        
    };

    return (
        <>
        {/* <div className="flex justify-center w-[80%] h-15 rounded-[30px] bg-black z-10 mt-4">
            <div className="w-[14%] h-8 rounded-[30px] bg-white z-10 mt-0.5"></div>
        </div> */}
        <div className="flex justify-center w-[100%] h-[10%] mt-4">
            <div className="w-[100%] h-[20%] rounded-[30px] bg-white z-10 flex items-center px-1">
                <div style={{ width: `${100/7 * (count + 1)}%` }} className="h-[70%] bg-[#62a1b6] rounded-[30px] "></div>
            </div>
        </div>

        <img className='h-[20%]' src={questionBackground[count]} alt="Question background cannot display" />

        <div className={`chat chat-start text-md py-4 space-y-3 flex flex-col w-full ${selectedOptions.length > 0 ? "h-[15%] items-start" : "items-center justify-center h-full"}
        ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'} 
        `}>
            <p className={`ml-6 w-[85%] chat-bubble chat-bubble-primary`}>{options[count].problem}</p>
        </div>

        <div className={`chat chat-end flex flex-col space-y-3 w-full ${selectedOptions.length > 0 ? "h-[45%]" : "h-[0%]"}`}>
            {selectedOptions.map((val, index) => (
            <button
                key={index}
                className={`mr-6 chat-bubble w-[100%] h-[25%] rounded-[30px] hover:text-black hover:bg-gray-300
                ${choice === index ? 'bg-gradient-to-r from-purple-300 to-blue-400  text-black' : 'bg-gray-800 text-white'}
                ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'}
                `}
                onClick={() => handleOptionClick(index)}
            >
                {val}
            </button>
            ))}
        </div>

        <div className={`flex justify-center w-full items-center ${selectedOptions.length > 0 ? "h-[10%]" : "h-[0%]"}`}>
            {(alert && selectedOptions.length > 0) ? <p className="text-red-600 h-full pr-4 flex items-center">記得選擇選項！</p> : <></>}
            {selectedOptions.length > 0 ? <button
            className={`h-[70%] w-[90%] duration-300 rounded-[30px] active:bg-yellow-300 active:text-black hover:text-black hover:bg-yellow-300 bg-gray-800 text-white`}
            onClick={handleSubmit}
            >
            送出
            </button> :
            <></>}
        </div>
        </>
    );
}

export default Options;
