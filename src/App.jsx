import { useState, useEffect } from "react";

import "./App.css";
import CardDiv from "./CardDiv";

function App() {
  const [imageList, setImageList] = useState([]);
  const [imageGroup, setImageGroup] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [round, setRound] = useState(1);
  const [layout, setLayout] = useState("twoByTwo");
  const [shufflingPhase, setShufflingPhase] = useState("front");
  const [overlay, setOverlay] = useState("visible");

  useEffect(() => {
    const controller = new AbortController();
    const url = "../allBrainrots.json";
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) console.log(response.status);
        return response.json();
      })
      .then((response) => {
        setImageList(response);
        console.log(response);
        let fourImages = [...response]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setImageGroup(fourImages);
        setOverlay("hidden");
      })
      .catch((error) => {
        console.log(error);
      });
    return () => controller.abort();
  }, []);

  function ShuffleGroup() {
    const group = [...imageGroup].sort(() => Math.random() - 0.5);
    setImageGroup(group);
  }

  function Shuffle(round) {
    let num;

    if (round === 1) {
      setLayout("twoByTwo");
      num = 4;
    } else if (round === 2) {
      setLayout("twoByThree");
      num = 6;
    } else if (round === 3) {
      setLayout("threeByThree");
      num = 9;
    } else if (round === 4) {
      setLayout("threeByFour");
      num = 12;
    } else if (round === 5) {
      setLayout("fourByFour");
      num = 16;
    }

    const newList = [...imageList]
      .sort(() => Math.random() - 0.5)
      .slice(0, num);
    setImageGroup(newList);
  }

  function endRound() {
    setOverlay("visible");
    setShufflingPhase("shufflingOut");
    setTimeout(() => {
      Shuffle(1);
      // setOverlay("hidden");
      setShufflingPhase("shufflingIn");
    }, 250);
  }

  function Clicked(id) {
    if (!clickedCards.includes(id)) {
      console.log("right on");
      setScore((prev) => prev + 1);
      setClickedCards((prev) => [...prev, id]);
      ShuffleGroup();
    } else if (clickedCards.includes(id)) {
      if (highScore < score) {
        setHighScore(score);
      }
      setScore(0);
      setClickedCards([]);
      endRound();
    } else {
      setScore(0);
      setClickedCards([]);
      endRound();
    }
  }

  function startNextRound() {
    setRound((r) => r + 1);
    setClickedCards([]);

    setShufflingPhase("shufflingOut");

    setTimeout(() => {
      Shuffle(round + 1);
      setShufflingPhase("shufflingIn");
    }, 250);
  }

  useEffect(() => {
    if (imageGroup.length > 0 && clickedCards.length === imageGroup.length) {
      console.log("hi");
      startNextRound();
    }
  }, [clickedCards, imageGroup]);

  return (
    <>
      <div className={`overlay ${overlay}`}>
        <div className={`messageArea ${overlay}`}>
          <h2>Game Over</h2>
          <br />
          <h3>Play Again?</h3>
          <button onClick={() => setOverlay("hidden")}>Again!</button>
        </div>
      </div>
      <h1 className="desktop_only">Click a BrainRot</h1>
      <div className="card">
        <h2 className="desktop_only">
          This round's score is {score} | High Score is {highScore}
        </h2>
        <div>
          <CardDiv
            imageGroup={imageGroup}
            Clicked={Clicked}
            shufflingPhase={shufflingPhase}
            imageList={imageList}
            layout={layout}
          />
        </div>
      </div>
    </>
  );
}

export default App;
