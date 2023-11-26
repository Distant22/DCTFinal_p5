import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// // http://localhost:3000/
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port = 3000;
// app.use(cors());
// app.use(express.json());

// const multer = require('multer');
// const firebase = require('firebase/app');
// const {getStorage, ref, uploadBytes, getDownloadURL} = require("firebase/storage");

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCgtAhpoJPZMZGuzcVOg9fufZCXJDKxNSU",
//     authDomain: "dct-musicgen-storage.firebaseapp.com",
//     projectId: "dct-musicgen-storage",
//     storageBucket: "dct-musicgen-storage.appspot.com",
//     messagingSenderId: "857043312122",
//     appId: "1:857043312122:web:dbb915b985b44d8a1d9843"
// };

// firebase.initializeApp(firebaseConfig);
// const storage = getStorage();
// const upload = multer({storage: multer.memoryStorage()});



// app.get('/',(req, res)=>{
// 	res.send("hello");
// })

// app.post('/upload', upload.single("music"), (req, res) => {
// 	if(!req.file){
// 		res.status(400).send("No file uploaded");
// 		return;
// 	}
// 	const StorageRef = ref(storage, req.file.originalname);
// 	const metadata = {
// 		contentType:'audio/mpeg',
// 	};
// 	uploadBytes(StorageRef, req.file.buffer, metadata)
//     .then(() => {
//       getDownloadURL(StorageRef).then((url) => {
//         res.send({ url });
//       }).catch((err) => {
//         console.log(err);
//         res.status(500).send(err);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// })

// app.listen(port,()=>{
// 	console.log(`listening on ${port}`);
// })