const form = document.getElementById("form");
const container = document.querySelector(".container");
const search = document.getElementById("search");
const mainContainer = document.getElementById("main");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const location = search.value;
  setTimeout(() => {
    const containerWeather = document.querySelector(".container--weather");
    containerWeather.style.opacity = 1;
  }, 500);
  location
    ? fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=32c5514ebf687e3924f638bc1d91f51a&units=metric`
      )
        .then((response) => response.json())
        .then((data) => currentWeather(data))
    : console.log("Enter a location");
  form.reset();
});

form.addEventListener("click", () => {
  container.style.top = "5%";
});

const currentWeather = (data) => {
  const { main, weather, name, ...rest } = data;
  console.log(data);
  createWeatherContainer(weather[0], main, name);
};

const createWeatherContainer = (weather, main, name) => {
  const { description, icon, ...restW } = weather;
  const { temp, ...restM } = main;

  const section = document.createElement("section");
  section.classList.add("container--weather");

  const locationDiv = document.createElement("div");
  locationDiv.classList.add("location");

  const locationDot = document.createElement("i");
  locationDot.setAttribute("class", "fa-solid fa-location-dot");

  const locationName = document.createElement("span");
  locationName.setAttribute("id", "locationName");
  locationName.innerText = name;

  const image = document.createElement("img");
  image.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

  const temperature = document.createElement("span");
  temperature.setAttribute("id", "degree");
  temperature.innerText = temp.toFixed(0);

  const symbol = document.createElement("sup");
  symbol.innerHTML = "°";

  const status = document.createElement("span");
  status.setAttribute("id", "status");
  status.innerText = description;

  mainContainer.prepend(section);
  section.appendChild(locationDiv);
  locationDiv.appendChild(locationDot);
  locationDiv.appendChild(locationName);
  section.appendChild(image);
  section.appendChild(temperature);
  temperature.appendChild(symbol);
  section.appendChild(status);
};
