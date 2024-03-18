import React, { useState }  from 'react';

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
        <div className={`text-md py-4 space-y-3 flex flex-col w-full ${selectedOptions.length > 0 ? "h-[18%] items-start" : "items-center justify-center h-full "}
        ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'} 
        `}>
            <p>{options[count].problem}</p>
        </div>
        <div className={`flex flex-col space-y-3 w-full ${selectedOptions.length > 0 ? "h-[66%]" : "h-[0%]"}`}>
            {selectedOptions.map((val, index) => (
            <button
                key={index}
                className={`w-[100%] h-[25%] rounded-md hover:text-black hover:bg-gray-300
                ${choice === index ? 'bg-gradient-to-r from-purple-300 to-blue-400  text-black' : 'bg-gray-800 text-white'}
                ${animation ? 'opacity-0 ease-in-out duration-700' : 'ease-in-out duration-700 opacity-100'}
                `}
                onClick={() => handleOptionClick(index)}
            >
                {val}
            </button>
            ))}
        </div>
        <div className={`flex justify-end w-full items-center ${selectedOptions.length > 0 ? "h-[16%]" : "h-[0%]"}`}>
            {(alert && selectedOptions.length > 0) ? <p className="text-red-600 h-full pr-4 flex items-center">記得選擇選項！</p> : <></>}
            {selectedOptions.length > 0 ? <button
            className={`h-[70%] w-[50%] duration-300 rounded-md active:bg-yellow-300 active:text-black hover:text-black hover:bg-yellow-300 bg-gray-800 text-white`}
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
