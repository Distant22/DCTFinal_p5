import React, { useState, useEffect } from 'react';
import P5Sketch from '../components/sketch';

function Collection() {
  const [result, setResult] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-blue-100 flex flex-col h-screen overflow-y-hidden font-serif items-center justify-center">
      <div className={`h-[70%] p-2 mx-2 rounded-xl font-bold flex flex-col items-center justify-center`}>
        {result ? 
          <>
            <P5Sketch userInput={150} />
          </> : <>  
              載入結果中...
          </>
        }
      </div>
    </div>
  );
}

export default Collection;
