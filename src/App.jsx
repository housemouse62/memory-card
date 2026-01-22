import { useState, useEffect } from "react";

import "./App.css";
import CardDiv from "./CardDiv";

function App() {
  const [imageList, setImageList] = useState([]);
  const [imageGroup, setImageGroup] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [roundPhase, setRoundPhase] = useState("front");
  const [isAnimating, setIsAnimating] = useState(false);

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
        let eightImages = [...response]
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
        setImageGroup(eightImages);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => controller.abort();
  }, []);

  function Shuffle() {
    const newList = [...imageList].sort(() => Math.random() - 0.5).slice(0, 8);
    setImageGroup(newList);
  }

  function endRound() {
    setIsAnimating(true);
    setRoundPhase("toBack");

    setTimeout(() => {
      setRoundPhase("back");

      Shuffle();

      setTimeout(() => {
        setRoundPhase("toFront");

        setTimeout(() => {
          setRoundPhase("front");
          setIsAnimating(false);
        }, 400);
      }, 50);
    }, 400);
  }

  function Clicked(id) {
    if (isAnimating) return;
    if (!clickedCards.includes(id)) {
      console.log("right on");
      setScore((prev) => prev + 1);
      setClickedCards((prev) => [...prev, id]);
      Shuffle();
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

  useEffect(() => {
    console.log(imageGroup);
    console.log(clickedCards);
  });

  return (
    <>
      <div></div>
      <h1 className="desktop_only">Click a BrainRot</h1>
      <div className="card">
        <h2 className="desktop_only">
          This round's score is {score} | High Score is {highScore}
        </h2>
        <div>
          <CardDiv
            imageGroup={imageGroup}
            Clicked={Clicked}
            roundPhase={roundPhase}
            imageList={imageList}
          />
        </div>
      </div>
    </>
  );
}

export default App;
