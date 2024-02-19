README 改寫

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

# 前端（使用者）操作
![螢幕擷取畫面 2023-11-28 164636](https://github.com/JOE-CHOU88/DCT-Final-Project-Firebase-Storage-Upload-MusicGen/assets/62171839/4672e296-8cba-415d-bd2d-00e4a9345494)

- 點選「生成音樂」，系統會利用 MusicGen 自動生成 10 秒鐘的音樂，並存在 /output-audio 資料夾下

（改編前音檔：bach.mp3，目前寫死，位於 /assets/bach.mp3）

- 點選「上傳至資料庫」，系統會將剛才生成的音樂傳至 Firebase Storage

# 整併專案
(1) DCT-Final-Project-MusicGen-New

https://github.com/JOE-CHOU88/DCT-Final-Project-MusicGen-New.git

(2) DCT-Final-Project-Firebase-Storage-Music-Upload

https://github.com/JOE-CHOU88/DCT-Final-Project-Firebase-Storage-Music-Upload.git
