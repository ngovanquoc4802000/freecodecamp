// Date , Month , Year
const currentDateParagraph = document.getElementById('current-date');
const dateOptionsSelectElement = document.getElementById('date-options');

const date = new Date(); // tổng cả ngày tháng năm ở đâu
const day = date.getDate();// ngày
const month = date.getMonth() + 1; // vì getMonth trong đó có 0 - 11 nên phải cộng  
const year = date.getFullYear(); // năm
const hours = date.getHours()//giờ
const minutes = date.getMinutes()//phút
const formattedDate = `${day}-${month}-${year}`
currentDateParagraph.textContent = formattedDate; 
/* const exampleSentence = "selur pmaCedoCeerf".split('').reverse().join('');
console.log(exampleSentence) */

dateOptionsSelectElement.addEventListener("change",() => {
  //khi người dùng họ lựa chọn value menu thả xuống
  switch (dateOptionsSelectElement.value) {
    case 'yyyy-mm-dd': 
    currentDateParagraph.textContent = formattedDate.split('-').reverse().join('-')
    break; // ngừng thực thi 
    case "mm-dd-yyyy-h-mm": 
    currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`
    break;
    default: 
    currentDateParagraph.textContent = formattedDate;
  }
})
