import { useState, useEffect } from "react";

import "./App.css";
import CardDiv from "./CardDiv";

function App() {
  const [imageList, setImageList] = useState([]);
  const [imageNum, setImageNum] = useState(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const url = "http://localhost:3000/api/brainrots";
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) console.log(response.status);
        return response.json();
      })
      .then((response) => {
        setImageList(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (imageList.length > 0 && imageNum === null) {
      setImageNum(Math.floor(Math.random() * imageList.length));
      console.log(imageNum);
    }
  }, [imageList]);

  return (
    <>
      <div></div>
      <h1>BrainRot</h1>
      <div className="card">
        <button onClick={() => setHighScore((highScore) => highScore + 1)}>
          count is {highScore}
        </button>

        <div>
          <CardDiv
            imageList={imageList}
            imageNum={imageNum}
            setImageNum={setImageNum}
          />
        </div>
      </div>
    </>
  );
}

export default App;
