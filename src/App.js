import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import NameInput from './components/name';
import Options from './components/Options';
import optionData from './options/option.json';
import P5Sketch from './components/sketch';

function App() {
  
  const [imageUrl, setImageUrl] = useState('');
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0
  })

  const handleNameSubmit = (val) => {
    setUser({...user, name: val});
  };

  const handleResult = (val) => {
    setResult(val)
  }

  const handleAddScore = (val) => {
    setUser({...user, score: user.score + val});
  }

  const handleUpload = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          const imgId = v4();
          const imgRef = ref(imgDB, `Imgs/${imgId}`);
 
          const response = await fetch(localImage);
          const blob = await response.blob();
  
          const uploadTaskSnapshot = await uploadBytes(imgRef, blob);
          const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

          resolve(downloadURL);
  
        } catch (error) {
          reject(error);
          console.error('Error uploading image:', error.message);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const saveUserData = async () => {
      try {
        const downloadURL = await handleUpload();
        const docRef = await addDoc(collection(txtDB, 'users'), {...user, imgUrl: downloadURL});
        console.log('Document ID:', docRef.id);
        await getImageUrl();

      } catch (error) {
          console.error('Error adding user data:', error);
      }
  };
      

  const getImageUrl = async () => {
    try {
      const imgRef = ref(imgDB, `Imgs/apple.jpg`);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);
    } catch (error) {
      console.error('Error getting image:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen overflow-y-hidden font-serif">
      <Header />
      <div className={`h-[70%] p-2 mx-2 rounded-xl font-bold flex flex-col items-center justify-center`}>

        {user.name === "" ?
          <NameInput onNameSubmit={handleNameSubmit} /> :<>
            {result ? 
              <>
                <p className="text-sm"> 使用者 {user.name} 的分數是 {user.score}</p>
                {/* <P5Sketch userInput={150} /> */}
                {imageUrl && <img src={imageUrl} alt="Image" />}
                <button onClick={saveUserData}>儲存結果</button>
              </> : <>  
                  <Options options={options} onChooseOption={handleAddScore} onResult={handleResult} />
              </>
            }
          </>
        }

      </div>
      <Footer />
    </div>
  );
}

export default App;
