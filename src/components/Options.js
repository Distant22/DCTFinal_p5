import React, { useState }  from 'react';
import question1Pic from '../background-img/q1.png';
import question2Pic from '../background-img/q2.png';
import question3Pic from '../background-img/q3.png';
import question4Pic from '../background-img/q4.png';
import question5Pic from '../background-img/q5.png';
import question6Pic from '../background-img/q6.png';
import question7Pic from '../background-img/q7.png';

const questionBackground = [question1Pic, question2Pic, question3Pic, question4Pic, question5Pic, question6Pic, question7Pic];

function Options({ options, onChooseOption, onResult }) {

    const [choice, setChoice] = useState("");
    const [count, setCount] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([...options[count].choices]);

    const [animation, setAnimation] = useState(false)
    const [block, setBlock] = useState(false)
    
    const handleOptionClick = (val) => {
        setBlock(false)
        setSelectedOptions([...selectedOptions]);
        setChoice(val)
    };
 

    const handleSubmit = () => {
        if ( choice === "" ) {
            setBlock(true)
        } else {
            let ans = choice
            setChoice("");
            setAnimation(true)
            setTimeout(() => {
                setAnimation(false)
                onChooseOption(options[count].value[ans])
                setCount(prevCount => (count + 1 < options.length) ? prevCount + 1 : 0);
                if (options[count + 1].choices.length === 0){
                    onResult(true)
                } else {
                    setSelectedOptions([...options[count + 1].choices]);
                }
                setBlock(false)
            }, 1200);  
        }
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

        <img className='h-[20%] aspect-square object-cover' alt="" src={questionBackground[count]} />

        <div className={` duration-700 justify-center chat-start text-md flex flex-col w-full ${selectedOptions.length > 0 ? "h-[15%] items-start" : "items-center  h-full"}
        ${animation ? 'opacity-0 ease-in-out' : 'ease-in-out opacity-100'} 
        `}>
            <p className={`ml-6 w-[85%] h-max chat-bubble chat-bubble-primary text-gray-50 text-md`}>{options[count].problem}</p>
        </div>

        <div className={` chat chat-end flex flex-col space-y-3 w-full ${selectedOptions.length > 0 ? "h-[45%]" : "h-[0%]"}`}>
            {selectedOptions.map((val, index) => (
            <button
                key={index}
                className={`mr-6 chat-bubble w-[100%] h-[20%] rounded-[30px] hover:text-black text-sm duration-700
                ${choice === index ? 'bg-blue-200 text-black' : 'bg-gray-800 text-white'}
                ${animation ? 'opacity-0 ease-in-out' : 'ease-in-out opacity-100'}
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
            className={`ease-in-out duration-700 h-[70%] w-[90%] rounded-[30px]  hover:text-black text-black  bg-blue-200
            ${animation ? 'opacity-0' : 'opacity-100'} 
            ${block ? 'hover:bg-red-400 ' : ''}
            `}
            onClick={handleSubmit}
            >
            { block ? "請選擇選項！" : "送出"}
            </button> :
            <></>}
        </div>
        </>
    );
}

export default Options;
