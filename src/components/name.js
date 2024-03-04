import React, { useState } from 'react';

function NameInput({ onNameSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError(true);
    } else {
      setError(false);
      onNameSubmit(name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-[75%] w-full">
      <p className="h-[10%]"></p>
      <div className="flex items-center justify-center w-full h-[20%] ">
        請輸入你的名字：
      </div>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-full w-[60%] h-[15%] p-4 shadow-lg bg-gray-600 text-gray-50" />
      <p className="h-[20%]"></p>
      <button onClick={handleSubmit} className="rounded-full bg-gray-600 text-gray-50 h-[12%] w-[40%] shadow-lg">送出</button>
      {error && <p className="h-[15%] text-gray-600 flex items-center justify-center">請輸入名字！</p>}
    </div>
  );
}

export default NameInput;
