const weather = document.querySelector('.weatherInfo');


  const url = 'https://api.openweathermap.org/data/2.5/weather?q=albuquerque&units=imperial&appid=766cc4c5847dc1e46a5927930e1b85f6';

  //////////////////////////
  //  Capitalize letters  //
  //////////////////////////

  function capital_letter(str) 
  {
      str = str.split(" ");

      for (var i = 0; i < str.length; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }

      return str.join(" ");
  }


  /////////////////////////
  // Calculate WindChill //
  /////////////////////////

  function windChill(tF, smH) {
    const f = 35.74 + 0.6215 * tF - 35.75 * (smH**0.16) + 0.4275 * tF * (smH**0.16);
    return f;
  }


  /////////////////////////
  //       Display       //
  /////////////////////////

  function  displayResults(weatherData) {

    let weatherCard = document.createElement('section');
    let weatherFirst = document.createElement('div');
    let weatherIcon = document.createElement('img');
    let currentTemp = document.createElement('p');
    let captionDesc = document.createElement('figcaption');
    let speed = document.createElement('p');
    let wind = document.createElement('p');
    let lonlat = document.createElement('div');
    let globe = document.createElement('img');
    let lonlatINT = document.createElement('div');
    let longitude = document.createElement('p');
    let latitude = document.createElement('p');

    // WEATHER ICON

    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `Picture of ${desc}`);
    captionDesc.textContent = capital_letter(desc);

    

    // TEMPERATURE

    const tF = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `<strong>${tF}&deg;F</strong> `;


    // WIND CHILL 

    const smH = weatherData.wind.speed;

    if (tF <= 50 && smH > 3) { 
      const windC = windChill(tF, smH);
      wind.textContent = `Wind Chill: ${windC.toFixed(2)}`;
    }
    
    else {
      wind.textContent = 'Wind Chill: N/A';
    }

    // SPEED

    speed.innerHTML = `Wind Speed: ${smH}`;

    // LONGITUDE - LATITUDE

    const iconsrcLL = `images/globe.svg`;
    const descLL = 'Image of the Earth';

    latitude.textContent = `Lat: ${weatherData.coord.lat}`;
    longitude.textContent = `Lon: ${weatherData.coord.lon}`;

    globe.setAttribute('src', iconsrcLL);
    globe.setAttribute('alt', `Picture of ${descLL}`);

    lonlatINT.appendChild(longitude);
    lonlatINT.appendChild(latitude);
    
    lonlat.appendChild(lonlatINT);
    lonlat.appendChild(globe);
    lonlat.classList.add('lonlatGlobe');

    weatherFirst.appendChild(weatherIcon);
    weatherFirst.appendChild(currentTemp);
    weatherFirst.classList.add('weatherTop');

    weatherCard.appendChild(weatherFirst);
    weatherCard.appendChild(captionDesc);
    weatherCard.appendChild(speed);
    weatherCard.appendChild(wind);
    weatherCard.appendChild(lonlat);

    document.querySelector('.weatherInfo').appendChild(weatherCard);
  }


  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
if (weather) { apiFetch(); }