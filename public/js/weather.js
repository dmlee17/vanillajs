import { LOCATION, WEATHER, TEMPERATURE, WEATHER_URL, WEATHER_ICON_URL } from "./common.js";

const getWeatherInfo = (lat, lon) => {
  const url = WEATHER_URL(lat, lon);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      TEMPERATURE.innerHTML = `${Math.round(data.main.temp)} ℃`;
      LOCATION.innerHTML = `${data.name}, ${data.sys.country}`;

      WEATHER.prepend(getWeatherIcon(data.weather[0]));
    });
};

const getWeatherIcon = (data) => {
  let img = document.createElement("img");
  img.setAttribute("src", WEATHER_ICON_URL(data.icon));
  img.setAttribute("alt", data.description);
  img.setAttribute("title", data.description);
  img.classList.add("weatherIcon");

  return img;
};

const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  getWeatherInfo(lat, lon);
};

const onGeoError = () => {
  console.log("failed");
};

export const refreshWeatherInfo = () => {
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}

refreshWeatherInfo();
