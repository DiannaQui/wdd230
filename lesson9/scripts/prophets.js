const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

const displayProphets = (dataProphets) => {
  dataProphets.prophets.forEach ( 
    prophet => {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let h3 = document.createElement('h3');
      let h4 = document.createElement('h4');
      let portrait = document.createElement('img');

      h2.textContent = `${prophet.name} ${prophet.lastname}`;
      h3.innerHTML = `Date of Birth: <br> ${prophet.birthdate}`;
      h4.textContent = `Place of Birth: ${prophet.birthplace}`;

      let suffix = '';

      switch (prophet.order) {
        case 1: 
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
      }

      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${suffix} Latter-day President`);
      portrait.setAttribute('loading', 'lazy');
      
      card.appendChild(h2);
      card.appendChild(h3);
      card.appendChild(h4);
      card.appendChild(portrait);

      document.querySelector('.cards').appendChild(card);
    }
  )
}

async function getProphets() {
  const response = await fetch(requestURL);

  if (response.ok) {
    let data = await response.json();
    displayProphets(data);
  }
}

getProphets();