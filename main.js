const apiKey = "12953fe211bb4c6992c203407243012";
const city = "Lyon"; // Remplace par la ville souhaitée
const days = 1; // Nombre de jours de prévisions (max 10 dans les plans payants)
const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const weatherDiv = document.getElementById("art-meteo");
    // Commence à partir de jour 2 (index 1 dans forecastday)
    data.forecast.forecastday.slice(0).forEach((day) => {
      const forecast = document.getElementById("first-sect");
      const sunrise = day.astro.sunrise;
      const sunset = day.astro.sunset;
      forecast.innerHTML = `
        <img src="https:${day.day.condition.icon}" alt="Icône météo">
        <p class="cond">${day.day.condition.text}</p>
             <p class="temp"> ${day.day.avgtemp_c}°C</p>
        <h3 class="date">${day.date}</h3> 
        <p class="truc">🌅 : ${sunrise}</p>
        <p class="truc">🌇 : ${sunset}</p>
      `;
      weatherDiv.appendChild(forecast);
    });
  })
  .catch((error) => console.error("Une erreur s'est produite :", error));
