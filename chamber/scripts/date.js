// ////////////// //
// Hamburger Menu //
// ////////////// //

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
  
  }
  
  const x = document.getElementById('hamburgerBtn')
  x.onclick = toggleMenu;


// ////////////////// //
// Time - Last Update //
// ////////////////// //


document.querySelector(".date").textContent = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(new Date());

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastupdated').textContent = `Last Modification: ${document.lastModified}`;


// ///////////// //
// Banner JoinUs //
// ///////////// //

const day = new Date();
const today = day.getDay();

if (today < 1 || today > 2) {
    const banner = document.querySelector('.joinUs');
    banner.remove();
} 


// ////////////////////////////////////// //
// Hidden date and time for the join form //
// ////////////////////////////////////// //

const joinDateCurrent = document.querySelector(".joinDate");
if (joinDateCurrent) { joinDateCurrent.textContent = day }



// ///////////// //
//  LAST VISIT   //
// ///////////// //

let dayBefore = localStorage.getItem('date');

localStorage.setItem('date', day);

dayBefore = Date.parse(dayBefore);

const number_mSdayS = (day - dayBefore)/86400000;


if (!number_mSdayS) {
    const numDaysN = document.querySelector("#lastVisit");
    if (numDaysN) { numDaysN.textContent = 0; }
}

else {
    const numDaysY = document.querySelector("#lastVisit");
    if (numDaysY) numDaysY.textContent = number_mSdayS.toFixed(0);
}


// ///////////////////// //
//  THANK YOU ELEMENTS   //
// ///////////////////// //

const button = document.querySelector('.submitBtn');

if (button) {
    button.addEventListener('click', () => {
        const nameF = document.querySelector('#fName').value;
        const nameL = document.querySelector('#lName').value;
        const email = document.querySelector('#emailMember').value;
        const phone = document.querySelector('#cellMember').value;
        localStorage.setItem('firstName', nameF);
        localStorage.setItem('lastName', nameL);
        localStorage.setItem('emailM', email);
        localStorage.setItem('phoneM', phone);
    })
}

const member = document.querySelector('.memberName');
if (member) {
    member.textContent = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }

const emailMember = document.querySelector('.emailConfirmation');
if (emailMember) {
    emailMember.textContent = localStorage.getItem('emailM');
    localStorage.removeItem('emailM');
}

const phoneMember = document.querySelector('.phoneMember');
if (phoneMember) {
    phoneMember.textContent = localStorage.getItem('phoneM');
    localStorage.removeItem('phoneM');
}


// ///////////////////// //
//       DIRECTORY       //
// ///////////////////// //

const displayDirectory = (dataDirectory) => {
    dataDirectory.companies.forEach ( 
        company => {
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let logo = document.createElement('img');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');

        let a = document.createElement('a');
        let link = document.createTextNode(company.URL);
        a.appendChild(link);
        a.href = '#'

        name.textContent = company.name;

        logo.setAttribute('src', company.image);
        logo.setAttribute('alt', `Photo of ${company.name}`);
        logo.setAttribute('loading', 'lazy');
  
        address.textContent = company.address;
        phoneNumber.textContent = company.phoneNumber;
      
        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(a);
  
        document.querySelector('.gridArticle').appendChild(card);
      }
    )
  }
  
async function getDirectory() {
    const response = await fetch("./json/data.json");
  
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      displayDirectory(data);
    }
  }
  
  const dir = document.querySelector('.menuDirectory');
  if (dir) {
    getDirectory();
  }



// ///////////////////// //
//      GRID - LIST      //
// ///////////////////// //

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".gridArticle");

// if (gridbutton || listbutton) {

  gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
  });

  listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
  });
// }