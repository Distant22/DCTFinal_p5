# 安裝說明
首先，Python 版本必須為 3.9

### Audiocraft

(Window 版)

在終端機執行：

    pip install git+https://github.com/facebookresearch/audiocraft.git

    pip install torchvision==0.16 -f https://download.pytorch.org/whl/torch_stable.html

    pip install torchaudio==2.1.0 -f https://download.pytorch.org/whl/torch_stable.html

(Mac 版)

在終端機執行：
    
    pip3 install git+https://github.com/facebookresearch/audiocraft.git

    pip3 install torchvision==0.16 -f https://download.pytorch.org/whl/torch_stable.html

    pip3 install torchaudio==2.1.0 -f https://download.pytorch.org/whl/torch_stable.html
    

### ffmpeg

(Window 版)

https://vocus.cc/article/64701a2cfd897800014daed0

(Mac 版)

https://phoenixnap.com/kb/ffmpeg-mac


### Firebase related packages
    
    npm install express nodemon cors firebase firebase-admin multer multer-firebase-storage firebase-functions @google-cloud/storage

### Run Python Script in the backend
    
    npm install express multer child_process


# 執行過程
前端程式在 src 資料夾內，後端程式在 server 資料夾內

開 2 個終端機執行：

後端：（執行在 port 5000）

    nodemon server/server.js

前端：（執行在 port 3000）
    
    npm start

# 整併專案
(1) DCT-Final-Project-MusicGen-New

https://github.com/JOE-CHOU88/DCT-Final-Project-MusicGen-New.git

(2) DCT-Final-Project-Firebase-Storage-Music-Upload

https://github.com/JOE-CHOU88/DCT-Final-Project-Firebase-Storage-Music-Upload.git

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
