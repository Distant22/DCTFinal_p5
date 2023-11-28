import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectFile1, setSelectFile1] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [message1, setMessage1] = useState('');

  const [loadingPY, setLoadingPY] = useState(false);
  const [messagePY, setMessagePY] = useState('');

  const [loading2, setLoading2] = useState(false);
  const [message2, setMessage2] = useState('');

  useEffect(() => {
    if (message1) {
      const timer = setTimeout(() => {
        setMessage1(''); // Clear the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [message1]);

  useEffect(() => {
    if (messagePY) {
      const timer = setTimeout(() => {
        setMessage2(''); // Clear the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [messagePY]);

  useEffect(() => {
    if (message2) {
      const timer = setTimeout(() => {
        setMessage2(''); // Clear the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [message2]);

  const handleFileInput1 = (event) => {
    setSelectFile1(event.target.files[0]);
  };

  const handleUpload1 = () => {
    const formData = new FormData();
    formData.append('music', selectFile1);
    setLoading1(true);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json()).then(result => {
      setLoading1(false);
      setMessage1(result.message);
      console.log(result);
    })
  };

  const handleExecuteMainPY = () => {
    setLoadingPY(true);
    fetch('http://localhost:5000/execute-main-py', {
      method: 'POST',
    }).then(res => res.json()).then(result => {
      setLoadingPY(false);
      setMessagePY(result.message);
      console.log(result);
    })
  };

  const handleUpload2 = () => {
    setLoading2(true);
    fetch('http://localhost:5000/upload-local-file', {
      method: 'POST',
    }).then(res => res.json()).then(result => {
      setLoading2(false);
      setMessage2(result.message);
      console.log(result);
    })
  };

  // The rest of your useEffect and return statements remain unchanged

  return (
    <div className="bg-[#f7f5f5]">
      <div className="flex justify-center items-center h-screen">
        {/* First file upload section */}
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-4">選擇音檔並上傳</h1>
          <label>
            <input type='file' onChange={handleFileInput1}></input>
          </label>
          <button onClick={handleUpload1} className='bg-green-700 text-white font-bold py-2 px-4 rounded'>
            {
              loading1 ? "Wait" : "Upload"
            }
          </button>
          {message1 && <p className="text-green-600 mt-2">{message1}</p>}
        </div>

        {/* Second file upload section */}
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md flex flex-col items-center">
          <h1 className="text-xl font-bold mb-4">上傳生成式音樂</h1>
          <button onClick={handleExecuteMainPY} className='bg-teal-400 text-white font-bold py-2 px-4 rounded'>
            {
              loadingPY ? "正在生成…請稍後" : "生成音樂"
            }
          </button>
          {messagePY && <p className="text-green-600 mt-2 mb-4">{messagePY}</p>}
          <button onClick={handleUpload2} className='bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'>
            {
              loading2 ? "正在上傳…請稍後" : "上傳至資料庫"
            }
          </button>
          {message2 && <p className="text-green-600 mt-2">{message2}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;