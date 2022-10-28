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


// ///////////// //
//  LAST VISIT   //
// ///////////// //

let dayBefore = localStorage.getItem('date');

localStorage.setItem('date', day);

dayBefore = Date.parse(dayBefore);

const number_mSdayS = (day - dayBefore)/86400000;


if (!number_mSdayS) {
    document.querySelector("#lastVisit").textContent = 0
}
else {
    document.querySelector("#lastVisit").textContent = number_mSdayS.toFixed(0);
}