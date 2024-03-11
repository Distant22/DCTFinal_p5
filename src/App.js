import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import NameInput from './components/name';
import Options from './components/Options';
import optionData from './options/option.json';
import P5Sketch from './components/sketch';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { imgDB, txtDB } from "./firebase";
import { v4 } from "uuid";
import localImage from './buildings/banana-peel.png';

function App() {
  
  const [options] = useState(optionData);
  const [result, setResult] = useState(false);

  // const [txt,setTxt] = useState('')
  const [img,setImg] = useState('')
  const [data,setData] = useState([])

  // 設定初始名稱
  const [user, setUser] = useState({
    name: "",
    score: 0,
    imgUrl: ""
  })

  const setUserImageUrl = (url) => {
    console.log("Inside set url : ",url);
    setUser(user => ({...user, imgUrl: url}));
  }

  const handleNameSubmit = (val) => {
    setUser({...user, name: val});
  };

  const handleResult = (val) => {
    setResult(val)
  }

  const handleAddScore = (val) => {
    setUser({...user, score: user.score + val});
  }

  // Upload image to storage
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

          setImg(downloadURL);
          setUser({...user, imgUrl: downloadURL})

          console.log('Updated User soon after setUser fun:', user, downloadURL);

          // Update user data with imgUrl
          // setUser({ ...user, imgUrl: downloadURL });

          console.log('Updated User inside promise:', user);
  
          resolve(downloadURL);
  
          console.log('Image uploaded successfully:', downloadURL);
        } catch (error) {
          reject(error);
          console.error('Error uploading image:', error.message);
        }
      });
    } catch (error) {
      // Throw the error to be caught by the outer try-catch block in saveUserData
      throw error;
    }
  };

  const saveUserData = async () => {
    try {
      // Add the user data to the "users" collection
      const downloadURL = await handleUpload();
      console.log("sdfdv", downloadURL);

      //await setUserImageUrl(downloadURL)

      // Log the updated user state
      console.log(user);

      const docRef = await addDoc(collection(txtDB, 'users'), user);

      // Log the ID of the newly added document
      console.log('Document ID:', docRef.id);
    } catch (error) {
        console.error('Error adding user data:', error);
    }
};


  useEffect(() => {
    const fetchData = async () => {
      const sendData = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/draw', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": user.name,
              "score": user.score
            })
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Success:', data);
        } catch (error) {
          console.error('There was a problem with your fetch operation:', error);
        }
      };
  
      if (result) {
        await sendData();
      }
    };
  
    fetchData();
  }, [result, user.name, user.score]);

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);
  

  return (
    <div className="flex flex-col h-screen overflow-y-hidden font-serif">
      <Header />
      <div className={`h-[70%] p-2 mx-2 rounded-xl font-bold flex flex-col items-center justify-center`}>

        {user.name === "" ?
          <NameInput onNameSubmit={handleNameSubmit} /> :<>
            {result ? 
              <>
                <p className="text-sm"> 使用者 {user.name} 的分數是 {user.score}</p>
                <P5Sketch userInput={150} />
                <button onClick={saveUserData}>儲存結果</button>
              </> : <>  
                  <Options options={options} onChooseOption={handleAddScore} onResult={handleResult} />
              </>
            }
          </>
        }

        {/* <input type="file" onChange={(e)=>handleUpload(e)} /><br/><br/>
        <button onClick={handleClick}>Add</button>

        {
          data.map(value=><div>
              <img src={value.imgUrl} height='200px' width='200px' alt=""/> 
          </div>)
        } */}
        

      </div>
      <Footer />
    </div>
  );
}

export default App;
