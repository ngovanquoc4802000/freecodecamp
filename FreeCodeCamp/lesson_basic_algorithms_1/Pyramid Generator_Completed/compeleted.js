const character = "#"; //đầu vào
let result = ""; //đầu ra;
const rows = [] //cần có
const count = 12//cần có

//bước 3 phân tách nó ra và gán paramt
function padRow(rowNumber,rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber)
}
//bước 2
for(let i = 1; i <= count;i++) {
  rows.push(padRow(i,count));
}
//bước 1
for(const row of rows) {
  result = result + row + '\n';
}
console.log(result);