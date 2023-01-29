const form = document.getElementById("form");
const container = document.querySelector(".container");
const search = document.getElementById("search");
const mainContainer = document.getElementById("main");

const containersInStorage = JSON.parse(localStorage.getItem("containers")) || [];

window.addEventListener("load", () => {
  containersInStorage.forEach((container) => {
    createWeatherContainer(container);
  });
  if (containersInStorage.length) {
    container.style.top = "5%";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const location = search.value;
  location
    ? fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=32c5514ebf687e3924f638bc1d91f51a&units=metric`
      )
        .then((response) => response.json())
        .then((data) => currentWeather(data))
    : console.log("Enter a location");
  form.reset();
});

mainContainer.addEventListener("click", (e) => {
  if(e.target.id === 'search') {
    container.style.top = "5%";
  }
  if (e.target.classList.contains("close-card")) {
    e.target.closest("section").style.opacity = 0;
    //remove after opacity animation ended
    setTimeout(() => {
      e.target.closest("section").remove();
    }, 500);
    //delete from local storage
    containersInStorage.forEach((container, index) => {
      if (container.name === e.target.nextElementSibling.innerText) {
        containersInStorage.splice(index, 1);
      }
    });
    localStorage.setItem("containers", JSON.stringify(containersInStorage));
  }
});

const currentWeather = (data) => {
  const { main, weather, name } = data;
  const { description, icon } = weather[0];
  const { temp } = main;
  const weatherInfos = {
    description: description,
    icon: icon,
    temp: temp,
    name: name,
  };
  let notSameName = true;
  for (const container of containersInStorage) {
    if (name == container.name) {
      notSameName = false;
    }
  }
  if (notSameName) {
    createWeatherContainer(weatherInfos);
    containersInStorage.push(weatherInfos);
    localStorage.setItem("containers", JSON.stringify(containersInStorage));
  } else {
    alert("You already have that location");
  }
};

const createInfoScreen = (textContent) => {
  // <div id="info-screen">
  //     <div class="info-container">
  //       <i class="fa-solid fa-xmark close-info"></i>
  //       <p>Please, enter different locations.<br> This location already added.</p>
  //     </div>
  //   </div>
  const infoContainer = document.createElement('div')
}

const createWeatherContainer = (weatherInfos) => {
  const { description, icon, temp, name } = weatherInfos;
  //create container elements and give their attributes
  const section = document.createElement("section");
  section.classList.add("container--weather");
  //appearing animation
  setTimeout(() => {
    section.style.opacity = 1;
  }, 500);
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
  const xMark = document.createElement("i");
  xMark.classList.add("fa-solid", "fa-xmark",'close-card');

  mainContainer.prepend(section);
  section.appendChild(xMark);
  section.appendChild(locationDiv);
  locationDiv.appendChild(locationDot);
  locationDiv.appendChild(locationName);
  section.appendChild(image);
  section.appendChild(temperature);
  temperature.appendChild(symbol);
  section.appendChild(status);
};
