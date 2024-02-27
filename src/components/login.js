import React, { useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's consider a basic check for a hardcoded username and password
    setIsAuthenticated(true);
    console.log(username);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">網路生態城</h1>
      <input
        type="text"
        placeholder="請輸入你的暱稱"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      {/* <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded"
      /> */}
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleLogin}
      >
        登入
      </button>
    </div>
  );
};

export default Login;