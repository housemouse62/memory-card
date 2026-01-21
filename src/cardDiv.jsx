import "./CardDiv.css";

export function GetImages({ imageGroup, Clicked, imageList }) {
  if (imageGroup.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section aria-label="game cards area" className="gameframe">
        <div className="cards">
          {imageGroup.map((card) => (
            <div key={card.key} className="gamecard">
              <img
                class="rotImage"
                src={card.image}
                onClick={() => Clicked(card.key)}
              ></img>
              <h3>{card.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default GetImages;
