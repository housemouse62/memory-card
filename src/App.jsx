import { useState } from "react";

import "./App.css";
import { GetImages } from "./cardDiv";

function App() {
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <div></div>
      <h1>BrainRot</h1>
      <div className="card">
        <button onClick={() => setHighScore((highScore) => highScore + 1)}>
          count is {highScore}
        </button>
        <div>
          <GetImages />
        </div>
      </div>
    </>
  );
}

export default App;
