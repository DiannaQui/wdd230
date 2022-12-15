// Menu
function fruitMenu() { document.querySelector(".bountifulNav").classList.toggle("open"); }

const menu = document.querySelector('.navButton');
menu.addEventListener('click', fruitMenu);

// Last Update
let orderDate = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(new Date());
document.querySelector('#lastModifiedDate').innerHTML = `Last Modification: <br>${document.lastModified}`;

// Weather
const weather = document.querySelector('.weather');
const url = 'https://pro.openweathermap.org/data/2.5/forecast/daily?q=Carlsbad&units=imperial&cnt=4&appid=766cc4c5847dc1e46a5927930e1b85f6';

// Capitalize
function capital_letter(str) {
  str = str.split(" ");
  for (var i = 0; i < str.length; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  } return str.join(" ");
}

function displayResults(weatherData, i) {

  let weatherCard = document.createElement('section');
  let div = document.createElement('div');
  let currentTemp = document.createElement('h3');
  let dateL = document.createElement('h2')

  // Date
  let d = new Date(weatherData.list[i].dt * 1000);
  let onlyD = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(d);

  dateL.textContent = onlyD;
  weatherCard.appendChild(dateL);

  // Temperature
  const tF = weatherData.list[i].temp.day.toFixed(0);
  currentTemp.innerHTML = `${tF}&deg;F`;

  div.appendChild(currentTemp);

  if (i == 0) {

    let weatherFigure = document.createElement('figure');
    let weatherIcon = document.createElement('img');
    let captionDesc = document.createElement('figcaption');
    let humidity = document.createElement('h2');
  

  // Icon
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png`;
    const desc = weatherData.list[i].weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `Picture of ${desc}`);
    captionDesc.textContent = capital_letter(desc);

  // Humidity
    humidity.textContent = `Humidity: ${weatherData.list[i].humidity}`;

    weatherFigure.appendChild(weatherIcon);
    weatherFigure.appendChild(captionDesc);
    div.appendChild(weatherFigure);
    div.appendChild(humidity);

  }

    weatherCard.appendChild(div);
    if (i == 0) { document.querySelector('.weather1').appendChild(weatherCard);}
    else { document.querySelector(`.weather${i+1}`).appendChild(weatherCard); }
}

//  ASYNC API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data,0);

      for (let i=1; i < 4; i++) 
      { displayResults(data, i); }

    } else { throw Error(await response.text());}
  } catch (error) { console.log(error);}
}
if (weather) { apiFetch(); }

// form
const urlForm = 'https://brotherblazzard.github.io/canvas-content/fruit.json';

function displayIngredients(ingredientsData, i) {
  let ingredientsCard = document.createElement('select');

  ingredientsCard.name = `ingredient${i}`;
  ingredientsCard.id = `ingredient${i}`;

  ingredientsData.forEach ( 
    ingredient => {
      let option = document.createElement('option');

      option.value = ingredient.name;
      option.textContent = ingredient.name;
      ingredientsCard.appendChild (option);
    }
  )
  document.querySelector(`.ingredient${i}`).appendChild(ingredientsCard);
}

// ASYNC JSON
async function getIngredients(action) {

  const response = await fetch(urlForm);
  if (response.ok) {
      let dataIng = await response.json();
      if (action == 1) {
        for (let i=0; i < 3; i++) { displayIngredients(dataIng, i+1); }
       }
      if (action == 2) { printOrder(dataIng); }
    }
}
const ing = document.querySelector('.ingredient1');
if (ing) { getIngredients(1);}

// ORDER
function printOrder(ingredientsData) {

  document.querySelector('.submitBtnFresh').style.display = 'none';

  let numberSD = parseInt(localStorage.getItem('orders')) + 1;

  if (!numberSD) {numberSD = 1; }
  localStorage.setItem('orders', numberSD);
  document.querySelector('.numberSpecialtyDrinks').textContent = numberSD;

  // display order
  const display = document.querySelector('.displayOrder');

  let title = document.createElement('h3');  
  let date = document.createElement('h4');
  let costumerDiv = document.createElement('div');
  let nameCostumer = document.createElement('h4');
  let email = document.createElement('h4');
  let phone = document.createElement('h4');

  title.classList = 'titleOrder';
  title.textContent = 'Your order details';
  date.classList = 'orderDate';
  date.textContent = orderDate;
  nameCostumer.textContent = `Name: ${document.querySelector('#nameCostumer').value}`;
  email.textContent = `Email: ${document.querySelector('#emailCostumer').value}`;
  phone.textContent = `Phone: ${document.querySelector('#phoneCostumer').value}`;

  costumerDiv.classList = 'costumerInfoOrder';
  costumerDiv.appendChild(nameCostumer);
  costumerDiv.appendChild(phone);
  costumerDiv.appendChild(email);
  
  display.appendChild(title);
  display.appendChild(date);
  display.appendChild(costumerDiv);

  document.querySelector('#nameCostumer').value = '';
  document.querySelector('#emailCostumer').value = '';
  document.querySelector('#phoneCostumer').value = '';
  document.querySelector('.instructionsFresh').value = '';

  let carbohydratesSum = 0;
  let proteinSum = 0;
  let fatSum = 0;
  let sugarSum = 0;
  let caloriesSum  = 0;

  for (let i=1; i<4; i++) {

    const filterIngredients = ingredientsData.filter ((ingredient) => 
      ingredient.name == document.querySelector(`#ingredient${i}`).value);
      
      let cardInfo = document. createElement('div');
      let nameFruit = document.createElement('h5');
      let carbohydrates = document.createElement('h6');
      let protein = document.createElement('h6');
      let fat = document.createElement('h6');
      let sugar = document.createElement('h6');
      let calories  = document.createElement('h6');

      nameFruit.textContent = `Fruit selected: ${filterIngredients[0].name}`;

      let carbohydratesInfo = filterIngredients[0].nutritions.carbohydrates;
      carbohydrates.textContent = `Carbohydrates: ${carbohydratesInfo}`;
      
      let proteinInfo = filterIngredients[0].nutritions.protein;
      protein.textContent = `Protein: ${proteinInfo}`;
      
      let fatInfo = filterIngredients[0].nutritions.fat;
      fat.textContent = `Fat: ${fatInfo}`;
      
      let sugarInfo = filterIngredients[0].nutritions.sugar;
      sugar.textContent = `Sugar: ${sugarInfo}`;
      
      let caloriesInfo = filterIngredients[0].nutritions.calories;
      calories.textContent = `Calories: ${caloriesInfo}`;

      cardInfo.classList = 'cardInfoOrder';
      cardInfo.appendChild(nameFruit);
      cardInfo.appendChild(carbohydrates);
      cardInfo.appendChild(protein);
      cardInfo.appendChild(fat);
      cardInfo.appendChild(sugar);
      cardInfo.appendChild(calories);

      display.appendChild(cardInfo);

      carbohydratesSum += carbohydratesInfo;
      proteinSum += proteinInfo;
      fatSum += fatInfo;
      sugarSum += sugarInfo;
      caloriesSum += caloriesInfo;
  }

  let sumCard = document.createElement('div');
  let titleSum = document.createElement('h5');
  let carbohydratesCard = document.createElement('h6');
  let proteinCard = document.createElement('h6');
  let fatCard = document.createElement('h6');
  let sugarCard = document.createElement('h6');
  let caloriesCard = document.createElement('h6');

  titleSum.textContent = 'Total based upon the three fruit choices selected';
  carbohydratesCard.textContent = `Total carbohydrates: ${carbohydratesSum.toFixed(2)}`;
  proteinCard.textContent = `Total protein: ${proteinSum.toFixed(2)}`;
  fatCard.textContent = `Total fat: ${fatSum.toFixed(2)}`;
  sugarCard.textContent = `Total sugar: ${sugarSum.toFixed(2)}`;
  caloriesCard.textContent = `Total calories: ${caloriesSum.toFixed(0)}`;

  sumCard.classList = 'totalFruitChoices';
  sumCard.appendChild(titleSum);
  sumCard.appendChild(carbohydratesCard);
  sumCard.appendChild(proteinCard);
  sumCard.appendChild(fatCard);
  sumCard.appendChild(sugarCard);
  sumCard.appendChild(caloriesCard);
 
  display.appendChild(sumCard);
}

function specialtyOrder(orderNumber) {
  drinks = `drinkOrder${orderNumber}`;
  let newOrder = parseInt(localStorage.getItem(drinks)) + 1;
  if (!newOrder) { newOrder = 1; }
  localStorage.setItem(`${drinks}`,newOrder);

  let newGeneralOrder = parseInt(localStorage.getItem('orders')) + 1;
  if (!newGeneralOrder) { newGeneralOrder = 1; }
  localStorage.setItem('orders',newGeneralOrder);

  document.querySelector(`.drink${orderNumber}`).textContent = newOrder;
  document.querySelector('.numberSpecialtyDrinks').textContent = newGeneralOrder;
}

const local = localStorage.getItem('orders');
if(!local) {localStorage.setItem('orders',0)}
document.querySelector('.numberSpecialtyDrinks').textContent = localStorage.getItem('orders');

const ordersHome = document.querySelector('.specialty');
if (ordersHome) {
  for (i=1; i<5; i++) {
    document.querySelector(`.drink${i}`).textContent = localStorage.getItem(`drinkOrder${i}`);
  }
}

function clearS() {
  localStorage.clear();
  document.querySelector('.numberSpecialtyDrinks').textContent = 0;
  for (i=1; i<5; i++) { document.querySelector(`.drink${i}`).textContent = 0;}
}

function aboutForm() {
  document.querySelector('.submitBtnAbout').style.display = 'none';
  document.querySelector('.thankYou').textContent = 'Thank you! We will contact you as soon as possible.'
}

function change(arrow) {
  let s1 = [4, 3, 2, 1, 5], s2 = [5, 4, 3, 2, 1], s3 = [5, 1, 2, 3, 4];
  for (let i = 0; i<5; i++) {
    if (arrow == 1) {
      document.getElementById(`specialty${s1[i]}`).id = `specialty${s2[i]}`; 
    }
  
    if (arrow == 2) {
      document.getElementById(`specialty${i+1}`).id = `specialty${s3[i]}`; 
    }
  }
}

n = [];
// TESTIMONIES JSON
function displayTestimonies(list) {
    n[1] = Math.floor(Math.random() * list.length);

    if (n[1] == list.length - 1) { n[2] = 1; } else { n[2] = n[1] + 1; };
    if (n[2] == list.length - 1) { n[3] = 1; } else { n[3] = n[2] + 1; }; 
    
    for(let i = 1; i < 4; i++) {
      document.querySelector(`.title${i}`).textContent = list[n[i]].title;
      document.querySelector(`.comment${i}`).textContent = list[n[i]].comment;
    }
}

async function getTestimonies() {
  const response = await fetch('./json/testimonies.json');
  if (response.ok) {
      let dataTest = await response.json();
      displayTestimonies(dataTest); 
    }
}

const test = document.querySelector('.testimonials');
if (test) { getTestimonies(); }