const apiKey = "d431a2f06b7bcd48729bd7e6cadda6f3";

function loadWeather() {
  const city = document.getElementById("city");
  const cityName = city.textContent;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = (data.main.temp - 273.15).toFixed(1);
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      document.getElementById("city").textContent = data.name;
      document.getElementById("temperature").textContent = `${temp}°C`;
      document.getElementById("description").textContent = desc;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${wind} m/s`;
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("Error fetching weather data. Please check the city name and try again.");
    });
}

const findCity = document.getElementById("find-city");
findCity.addEventListener("click", () => {
  const cityName = document.getElementById("city-input").value;
  document.getElementById("city").textContent = cityName;
  loadWeather();
});

window.onload = () => {
  loadWeather();
  setInterval(loadWeather, 60000);
};