const weather = document.querySelector('.weatherInfo');
const url = 'https://api.openweathermap.org/data/2.5/weather?q=rio rancho&units=imperial&appid=766cc4c5847dc1e46a5927930e1b85f6';

// Capitalize
  function capital_letter(str) {
      str = str.split(" ");
      for (var i = 0; i < str.length; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      } return str.join(" ");
  }

// WindChill
  function windChill(tF, smH) {
    const f = 35.74 + 0.6215 * tF - 35.75 * (smH**0.16) + 0.4275 * tF * (smH**0.16);
    return f;
  }

// Display
  function displayResults(weatherData) {
    let weatherCard = document.createElement('section');
    let weatherFigure = document.createElement('figure');
    let weatherIcon = document.createElement('img');
    let captionDesc = document.createElement('figcaption');
    let currentTemp = document.createElement('h3');
    let speed = document.createElement('p');
    let wind = document.createElement('p');
    let lonlatINT = document.createElement('div');
    let longitude = document.createElement('p');
    let latitude = document.createElement('p');

// Icon
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `Picture of ${desc}`);
    captionDesc.textContent = capital_letter(desc);

// Temperature
    const tF = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `${tF}&deg;F`;

// WindChill
    const smH = weatherData.wind.speed;
    if (tF <= 50 && smH > 3) { 
      const windC = windChill(tF, smH);
      wind.textContent = `Wind Chill: ${windC.toFixed(2)}`;
    } else { wind.textContent = 'Wind Chill: N/A';}
    speed.innerHTML = `Wind Speed: ${smH}`;

// Lon Lat
    latitude.textContent = `Latitude: ${weatherData.coord.lat}`;
    longitude.textContent = `Longitude: ${weatherData.coord.lon}`;
    lonlatINT.appendChild(longitude);
    lonlatINT.appendChild(latitude);
    lonlatINT.classList.add('lonlatGlobe');
    weatherFigure.appendChild(weatherIcon);
    weatherFigure.appendChild(captionDesc)
    weatherCard.appendChild(currentTemp);
    weatherCard.appendChild(weatherFigure)
    weatherCard.appendChild(speed);
    weatherCard.appendChild(wind);
    weatherCard.appendChild(lonlatINT);
    document.querySelector('.weatherInfo').appendChild(weatherCard);
  }

  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        displayResults(data);
      } else { throw Error(await response.text());}
    } catch (error) { console.log(error);}
  }
if (weather) { apiFetch(); }