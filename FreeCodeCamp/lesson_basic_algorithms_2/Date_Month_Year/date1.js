const dateOptionsSelectElement = document.getElementById("date-options");
const currentDateParagraph = document.getElementById("current-date");

const date = new Date();
const Day = date.getDate();
const Hours = date.getHours();
const Minutes = date.getMinutes(); 
const MilliSecond = date.getMilliseconds();
const Month = date.getMonth() + 1;
const Year = date.getFullYear();
const formattedDate = `${Day}-${Month}-${Year}-${MilliSecond}`;
currentDateParagraph.innerText = formattedDate;
dateOptionsSelectElement.addEventListener("change",(e) => {
  switch(e.target.value) {
    case "yyyy-mm-dd" : 
    currentDateParagraph.innerText = formattedDate.split('-').reverse().join('-');
    break;
    case "mm-dd-yyyy-h-mm": 
    currentDateParagraph.innerText = `${Month}-${Day}-${Year}-${Hours}-${Minutes}`;
    break;
    default: 
    currentDateParagraph.innerText = formattedDate
  }
})
