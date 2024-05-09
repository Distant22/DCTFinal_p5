import React, { useState, useEffect } from 'react';
import { collection, limit, query, getDocs, orderBy } from "firebase/firestore";
import { imgDB, txtDB } from "../firebase";
import { ref } from "firebase/storage";

function Collection() {
    const [result, setResult] = useState(false);
    const [count, setCount] = useState(0);
    const [music, setMusic] = useState("");
    const [cities, setCities] = useState([])

    useEffect(() => {

        const interval = setInterval(() => {
            window.location.reload();
        }, 30000); 
    
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {

        const fetchResults = async () => {
            const querySnapshot = await getDocs(
                query(collection(txtDB, "users"), orderBy("uploadTime", "desc"))
            );
            const num = querySnapshot.size;

            const temp_city = [];
            const username = [];
            const promises = [];
            const cities_count = [
                { name: "banana", chin_name: "香蕉", value: 0 },
                { name: "bank", chin_name: "銀行", value: 0 },
                { name: "garbage", chin_name: "垃圾桶", value: 0 },
                { name: "residence", chin_name: "住宅", value: 0 },
                { name: "church", chin_name: "教堂", value: 0 },
                { name: "hamburger", chin_name: "餐廳", value: 0 },
                { name: "school", chin_name: "學校", value: 0 },
                { name: "television", chin_name: "電視台", value: 0 },
                { name: "skybuilding", chin_name: "摩天大樓", value: 0 },
                { name: "factory", chin_name: "工廠", value: 0 },
                { name: "drink", chin_name: "飲料店", value: 0 },
                { name: "park", chin_name: "公園", value: 0 },
                { name: "temple", chin_name: "廟宇", value: 0 }
            ]
    
            querySnapshot.forEach((doc) => {
                const imgUrlPromise = new Promise(async (resolve, reject) => {
                    try {
                        // const imgRef = ref(imgDB, `${doc.data().imgType}.png`);
                        // const url = await getDownloadURL(imgRef);
                        temp_city.push(doc.data().imgType + " ");

                        for ( let i = 4 ; i < 12 ; i++ ){
                            let substring = doc.data().imgType.substring(0, i)
                            let index = cities_count.findIndex((obj) => obj.name === substring )
                            if ( index !== -1 ){
                                cities_count[index].value++;
                            }
                        }
                        setCities(cities_count)
                        username.push(doc.data().name);
                        resolve();
                    } catch (error) {
                        reject(error); 
                    }
                });
                promises.push(imgUrlPromise);
            });

            await Promise.all(promises);
            setCount(num)
            
            setResult(true);
        };
        fetchResults();
        fetchHighestCountMusic();
    }, []);

    const fetchHighestCountMusic = async () => {
        try {
          const musicRef = collection(txtDB, 'music');
          const querySnapshot = await getDocs(query(musicRef, orderBy('time', 'desc'), limit(1)));
      
          if (!querySnapshot.empty) {
            const highestCountMusic = querySnapshot.docs[0];
            setMusic(highestCountMusic.id) 
            console.log('The music with the highest count is:', highestCountMusic.id);
          } else {
            console.log('No music found in the collection.');
          }
        } catch (error) {
          console.error('Error fetching highest count music:', error);
        }
      };

    
    return (
        <div className="items-center justify-center flex flex-col bg-blue-50 h-screen w-screen overflow-y-hidden"> 
            {result ? (
                <>
                <p className="font-bold justify-center flex py-4 my-4 text-sm lg:text-xl text-gray-200 w-[60%] lg:w-[38%] rounded-xl bg-slate-600">網路生態城 - 結果統計</p>
                <div className="font-bold flex flex-col items-center text-xs lg:text-xl justify-start relative z-10 w-[60%] lg:w-[38%] h-max p-6 rounded-xl bg-gray-300 space-y-1">
                我們一共搜集到了 {count} 筆建築物! <br />
                目前播放的音樂是 {music} <br />
                <br />
                {cities.map(city => (
                  <div key={Object.keys(city)[0]} className="w-full grid grid-cols-4 lg:grid-cols-8 text-xs lg:text-lg ">
                    <p className="col-span-2 lg:col-start-3">{Object.values(city)[1]}</p>
                    <p className="col-span-1 flex justify-center items-center">{Object.values(city)[2]}</p>
                    <p className="col-span-1">個</p>
                  </div>
                ))}
              </div>
              </>
            ) : (
                <div className="flex items-center justify-center relative z-10">
                    
                </div>
            )}
        </div>
    );
}


export default Collection;