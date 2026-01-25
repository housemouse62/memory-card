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
        let fourImages = [...response]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setImageGroup(fourImages);
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

  useEffect(() => {
    const cardCountByRound = { 1: 4, 2: 6, 3: 9, 4: 12, 5: 16 };
    const layoutByRound = {
      1: "twoByTwo",
      2: "twoByThree",
      3: "threeByThree",
      4: "threeByFour",
      5: "fourByFour",
    };
    const cardCount = cardCountByRound[round] ?? 16;
    const thisLayout = layoutByRound[round] ?? "fourByFour";

    const newGroup = [...imageList]
      .sort(() => Math.random() - 0.5)
      .slice(0, cardCount);
    setImageGroup(newGroup);

    setLayout(thisLayout);
  }, [round]);

  function endRound() {
    setOverlay("visible");
    setShufflingPhase("shufflingOut");
    setGamePhase("beginGame");
    setScore(0);
    setClickedCards([]);
    setRound(1);
    setTimeout(() => {
      // Shuffle(round);
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
      // Shuffle(round + 1);
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
