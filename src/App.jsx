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

  const [gamePhase, setGamePhase] = useState("beginGame");
  // beginGame -> opening screen, play -> no layover, gameover -> play again screen

  const [layout, setLayout] = useState("twoByTwo");
  const [shufflingPhase, setShufflingPhase] = useState("front");
  const [overlay, setOverlay] = useState("hidden");

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
        // setOverlay("hidden");
      })
      .catch((error) => {
        console.log(error);
      });
    return () => controller.abort();
  }, []);

  // Shuffle between each click, same group of cards
  function ShuffleGroup() {
    const group = [...imageGroup].sort(() => Math.random() - 0.5);
    setImageGroup(group);
  }

  // Shuffle between rounds as user advances
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

    const newGroup = [...imageList]
      .sort(() => Math.random() - 0.5)
      .slice(0, num);
    setImageGroup(newGroup);
  }

  function endRound() {
    setOverlay("visible");
    setShufflingPhase("shufflingOut");
    setGamePhase("beginGame");
    setScore(0);
    setClickedCards([]);
    setRound(1);
    setTimeout(() => {
      Shuffle(round);
      setShufflingPhase("shufflingIn");
    }, 250);
  }

  function newGame() {
    setGamePhase("play");
    setOverlay("hidden");
  }

  function Clicked(id) {
    if (!clickedCards.includes(id)) {
      setScore((prev) => prev + 1);
      setClickedCards((prev) => [...prev, id]);
      ShuffleGroup();
    } else if (clickedCards.includes(id)) {
      if (highScore < score) {
        setHighScore(score);
      }
      setGamePhase("gameover");
      endRound();
    } else {
      setGamePhase("gameover");
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
      console.log("array lengths matched");
      startNextRound();
    }
  }, [clickedCards, imageGroup]);

  useEffect(() => {
    console.log(clickedCards);
    console.log(imageGroup);
    console.log(`round ${round}`);
  });
  return (
    <>
      <div className={`overlay ${overlay}`}>
        <div className={`messageArea ${overlay}`}>
          <div className={`${gamePhase === "gameover"} && ${overlay}`}>
            <h2 className="gameOver">Game Over</h2>
            <br />
            <h3 className="playAgain">Play Again?</h3>
            <button className="playButton" onClick={() => newGame()}>
              Again!
            </button>
          </div>
        </div>
      </div>

      <h1 className="desktop_only gameName">Click a BrainRot</h1>
      <div className="card">
        <aside className="roundScore desktop_only">
          <div className="boardWord1">
            <h2>Round</h2>
            <span className="boardNum">{round}</span>
          </div>
          <div className="boardWord">
            <h2>Clicked Cards</h2>
            <span className="boardNum">{score}</span>
          </div>
          <div className="boardWord">
            <h2>High Score</h2>
            <span className="boardNum">{highScore}</span>
          </div>
        </aside>

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
