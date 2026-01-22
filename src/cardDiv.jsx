import "./CardDiv.css";
import React from "react";

export function GetImages({ imageGroup, Clicked, roundPhase }) {
  if (!imageGroup || imageGroup.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mainContainer">
      <section aria-label="game cards area" className="gameframe">
        <div className="cards">
          {imageGroup.map((card) => (
            <div
              key={card.key}
              className="gamecard"
              onClick={() => Clicked(card.key)}
            >
              <div className={`cardInner ${roundPhase}`}>
                <div className="cardFront">
                  <div className="image-wrapper">
                    <img
                      className="rotImage"
                      src={card.image}
                      alt={card.name}
                    />
                    <h3 className="card-name">{card.name}</h3>
                  </div>
                </div>
                <div className="cardBack desktop_only">
                  <p>BrainRot info / level info / credits</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default React.memo(GetImages);
