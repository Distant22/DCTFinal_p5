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
