import { PIXABAY_URL } from "./common.js";

export const getBackgroundImage = (bool) => {

  if (bool) {
    const url = PIXABAY_URL();
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        const number = Math.floor(Math.random() * 5);      
        document.body.style.backgroundImage = `url(${data.hits[number].largeImageURL})`;
        document.body.style.backgroundSize = "cover";
      });
  }
  else {
    document.body.style.background = 'white';
  }
}
