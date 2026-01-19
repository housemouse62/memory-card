export function GetImages({ imageList, imageNum, setImageNum }) {
  function randomImage() {
    const number = Math.floor(Math.random() * imageList.length);
    console.log(number);
    setImageNum(number);
  }
  if (imageList.length === 0 || imageNum === null) {
    return <p>Loading...</p>;
  } else console.log(imageNum);
  return (
    <>
      <img src={imageList[imageNum].image}></img>
      <h2>{imageList[imageNum].name}</h2>
      <button onClick={() => randomImage()}>New Brain Rot</button>
      <p></p>
    </>
  );
}

export default GetImages;
