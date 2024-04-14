import React, { useState }  from 'react';
// import question1Pic from '../background-img/question1-pic.png';
// import question2Pic from '../background-img/question2-pic.png';
// import question3Pic from '../background-img/question3-pic.png';
// import question4Pic from '../background-img/question4-pic.png';
// import question5Pic from '../background-img/question5-pic.png';
// import question6Pic from '../background-img/question6-pic.png';
// import question7Pic from '../background-img/question7-pic.png';
import temp_bg from '../background-img/temp-bg.png';

// const questionBackground = [question1Pic, question2Pic, question3Pic, question4Pic, question5Pic, question6Pic, question7Pic];
const questionBackground = [temp_bg, temp_bg, temp_bg, temp_bg, temp_bg, temp_bg, temp_bg]

function Options({ options, onChooseOption, onResult }) {

    const [choice, setChoice] = useState("");
    const [count, setCount] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([...options[count].choices]);

    const [animation, setAnimation] = useState(false)
    
    const handleOptionClick = (val) => {
        setSelectedOptions([...selectedOptions]);
        setChoice(val)
    };

    const handleSubmit = () => {
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
            onChooseOption(options[count].value[choice])
            setCount(prevCount => (count + 1 < options.length) ? prevCount + 1 : 0);
            if (options[count + 1].choices.length === 0){
                onResult(true)
            } else {
                setSelectedOptions([...options[count + 1].choices]);
            }
            setChoice("");

        }, 1200);     
    };

    return (
        <>
        {/* <div className="flex justify-center w-[80%] h-15 rounded-[30px] bg-black z-10 mt-4">
            <div className="w-[14%] h-8 rounded-[30px] bg-white z-10 mt-0.5"></div>
        </div> */}
        <div className="flex justify-center w-[100%] h-[5%] mt-4 ">
            <div className="w-[100%] h-[50%] rounded-[30px] bg-white z-10 flex items-center px-1">
                <div style={{ width: `${100/7 * (count + 1)}%` }} className="duration-300 ease-in-out h-[70%] bg-[#62a1b6] rounded-[30px] "></div>
            </div>
        </div>

        <img className='h-[25%] aspect-square object-cover mb-2' alt="" src={questionBackground[count]} />

        <div className={`first-letter:chat chat-start text-md flex flex-col w-full ${selectedOptions.length > 0 ? "h-[12%] items-start justify-center" : "items-center justify-center h-full"}
        ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'} 
        `}>
            <p className={`ml-6 w-[85%] h-[70%] chat-bubble chat-bubble-primary text-sm`}>{options[count].problem}</p>
        </div>

        <div className={`py-3 chat chat-end flex flex-col space-y-3 w-full ${selectedOptions.length > 0 ? "h-[36%]" : "h-[0%]"}`}>
            {selectedOptions.map((val, index) => (
            <button
                key={index}
                className={`mr-6 chat-bubble w-[100%] h-[25%] rounded-[30px] hover:text-black text-sm
                ${choice === index ? 'focus:bg-purple-300 bg-purple-300 text-black' : 'bg-gray-800 text-white'}
                ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'}
                `}
                onClick={() => handleOptionClick(index)}
            >
                {val}
            </button>
            ))}
        </div>

        <div className={`flex justify-center w-full items-center ${selectedOptions.length > 0 ? "h-[10%]" : "h-[0%]"}`}>
            {/* {(alert && selectedOptions.length > 0) ? <p className="text-red-600 h-full pr-4 flex items-center">記得選擇選項！</p> : <></>} */}
            {selectedOptions.length > 0 ? <button
            className={`h-[70%] w-[90%] duration-300 rounded-[30px] hover:bg-purple-300 hover:text-black bg-gray-800 text-white
            ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'} `}
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
