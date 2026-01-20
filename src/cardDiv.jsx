import "./CardDiv.css";

export function GetImages({ imageGroup, Clicked }) {
  if (imageGroup.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section aria-label="game cards area" className="gameboard">
        <div className="cards">
          {imageGroup.map((card) => (
            <div key={card.key} className="gamecard">
              <img src={card.image} onClick={() => Clicked(card.key)}></img>
              <h3>{card.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default GetImages;
