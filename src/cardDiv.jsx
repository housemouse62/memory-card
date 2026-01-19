import { useEffect, useState } from "react";

export function GetImages() {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const url = "http://localhost:3000/api/brainrots";
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) console.log(response.status);
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => controller.abort();
  }, []);
  if (!imageSrc) {
    return <p>Loading...</p>;
  }
  return <img src={imageSrc}></img>;
}
