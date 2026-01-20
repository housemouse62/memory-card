import { useState, useEffect } from "react";

import "./App.css";
import CardDiv from "./CardDiv";

function App() {
  const [imageList, setImageList] = useState([]);
  const [imageGroup, setImageGroup] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

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
        let twelveImages = [...response]
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
        setImageGroup(twelveImages);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => controller.abort();
  }, []);

  function Clicked(id) {
    if (!clickedCards.includes(id)) {
      console.log("right on");
      setScore(score + 1);
    }
    setClickedCards((prev) => [...prev, id]);
    console.log(id);
  }

  useEffect(() => {
    console.log(imageGroup);
    console.log(clickedCards);
  });

  return (
    <>
      <div></div>
      <h1>Click a BrainRot</h1>
      <div className="card">
        <button onClick={() => setHighScore((highScore) => highScore + 1)}>
          count is {score}
        </button>

        <div>
          <CardDiv imageGroup={imageGroup} Clicked={Clicked} />
        </div>
      </div>
    </>
  );
}

export default App;
