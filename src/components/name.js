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
    <div className="flex flex-col h-screen items-center justify-start space-y-6">
      <p className="flex h-[15%] w-full"></p>
      <h1 className="text-3xl font-bold mb-4">網路生態城</h1>
      <input
        type="text"
        placeholder="請輸入你的暱稱"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 border rounded w-[70%]"
      />
      <button
        className="bg-[#9fd0d6] duration-500 text-gray-700 p-2 rounded hover:bg-gray-700 hover:text-white w-[70%]"
        onClick={handleSubmit}
      >
        進入測驗
      </button>
      {error && <p className="h-[15%] text-gray-600 flex items-center justify-center">請輸入名字！</p>}
    </div>
  );

}

export default NameInput;
