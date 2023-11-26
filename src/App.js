import { useState } from 'react';
import './App.css';

function App() {
  const [selectFile, setSelectFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileInput = (event) => {
    setSelectFile(event.target.files[0]);
  }
  console.log(selectFile);
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('music', selectFile);
    setLoading(true);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json()).then(result => {
      setLoading(false);
      console.log(result);
    })
  }

  return (
    <div className="bg-[#f7f5f5]">
      <div className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-4">Upload Audio</h1>
          <label>
            <input type='file' onChange={handleFileInput}></input>
          </label>
          <button onClick={handleUpload} className='bg-green-700 text-white font-bold py-2 px-4 rounded'>
            {
              loading ? "Wait": "Upload"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
