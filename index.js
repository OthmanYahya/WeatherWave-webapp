const apiKey = "214f7020c197812318af97d0a97232a2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      // Handles all 400-500 errors
      error.style.display = "block";
      weather.style.display = "none";
      return;
    }

    const data = await response.json();

    // Update DOM elements
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}<sup>°C</sup>`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    // Update weather icon
    const weatherConditions = {
      Clouds: "clouds.png",
      Clear: "clear.png",
      Rain: "rain.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png",
    };

    weatherIcon.src = `images/${
      weatherConditions[data.weather[0].main] || "default.png"
    }`;

    error.style.display = "none";
    weather.style.display = "block";
  } catch (err) {
    error.style.display = "block";
    weather.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
  }
});

// Existing code
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

// New Enter key functionality
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // 1. Check for Enter key press
    e.preventDefault(); // 2. Prevent form submission behavior
    const city = searchBox.value.trim();
    if (city) {
      checkWeather(city);
      searchBox.value = ""; // 3. Clear input after search
    }
  }
});
