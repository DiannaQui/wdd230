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
}

const emailMember = document.querySelector('.emailConfirmation');
if (emailMember) {
    emailMember.textContent = localStorage.getItem('emailM');
}

const phoneMember = document.querySelector('.phoneMember');
if (phoneMember) {
    phoneMember.textContent = localStorage.getItem('phoneM');
}