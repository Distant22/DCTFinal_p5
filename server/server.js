// http://localhost:3000/
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
app.use(cors());
app.use(express.json());

const multer = require('multer');
const firebase = require('firebase/app');
const {getStorage, ref, uploadBytes, getDownloadURL} = require("firebase/storage");

const { exec } = require('child_process');

const fs = require('fs');
const path = require('path');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgtAhpoJPZMZGuzcVOg9fufZCXJDKxNSU",
    authDomain: "dct-musicgen-storage.firebaseapp.com",
    projectId: "dct-musicgen-storage",
    storageBucket: "dct-musicgen-storage.appspot.com",
    messagingSenderId: "857043312122",
    appId: "1:857043312122:web:dbb915b985b44d8a1d9843"
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});



app.get('/',(req, res)=>{
	res.send("hello");
})


app.post('/upload', upload.single("music"), (req, res) => {
	if(!req.file){
		res.status(400).send("No file uploaded");
		return;
	}
	const StorageRef = ref(storage, req.file.originalname);
	const metadata = {
		contentType:'audio/mpeg',
	};
	uploadBytes(StorageRef, req.file.buffer, metadata)
    .then(() => {
      getDownloadURL(StorageRef).then((url) => {
        res.send({ url, message: "Your file has been uploaded!" });
      }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
})

app.post('/execute-main-py', async (req, res) => {

  try {
	  const pythonScript = 'server/main.py'; // Replace with the actual path to main.py
    const pythonCommand = `python ${pythonScript}`;
    const fileContent = req.file ? req.file.buffer.toString('base64'): '';

    // Execute main.py with file content as input
    const command = `${pythonCommand} ${fileContent}`;

    console.log("Start exec");
    await exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing main.py: ${error}`);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      
      return res.status(200).json({ message: 'Successfully executed main.py' });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

})

app.post('/upload-local-file', async (req, res) => {
	const filePath = path.join(__dirname, '../output-audio/bach_output.wav');

	try {
    // Read the file from the local path
    const fileBuffer = fs.readFileSync(filePath);

    // Create a reference to the storage location with a custom name (e.g., "bach-output.wav")
    const StorageRef = ref(storage, 'output-audio/bach_output.wav');

    // Set metadata for the file (content type is set to audio/wav in this case)
    const metadata = {
      contentType: 'audio/mpeg',
    };

    // Upload the file to Firebase Storage
    await uploadBytes(StorageRef, fileBuffer, metadata);

    // Once the upload is successful, get the download URL of the uploaded file
    const url = await getDownloadURL(StorageRef);

    // Send the download URL and a success message as the response
    res.send({ url, message: 'Your file has been uploaded!' });

  } catch (err) {
    // Handle errors related to file reading, file upload, or getting the download URL
    console.error(err);
    res.status(500).send(err.message || 'Internal Server Error');
  }

})


app.listen(port,()=>{
	console.log(`listening on ${port}`);
})