document.querySelector(".date").textContent = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(new Date());

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#lastupdated').textContent = `Last Modification: ${document.lastModified}`