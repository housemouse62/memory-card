import "./CardDiv.css";
import React from "react";

export function GetImages({ imageGroup, Clicked, shufflingPhase, layout }) {
  if (!imageGroup || imageGroup.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mainContainer">
        <section aria-label="game cards area" className={`gameframe ${layout}`}>
          <div className={`cards ${layout}`}>
            {imageGroup.map((card) => (
              <div
                key={card.key}
                className="gamecard"
                onClick={() => Clicked(card.key)}
              >
                <div className={`cardInner ${shufflingPhase}`}>
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default React.memo(GetImages);
