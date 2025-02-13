// đếm số từ 0 đến 99
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);
// chữ
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = input.id;
      // phần này khi đụng đến update
      input.onchange = update
      container.appendChild(input);
    });
  });
  
};

const isEven = (num) => num % 2 === 0;
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);
//tính trung bình
const average = (nums) => sum(nums) / nums.length; // chia cho số lượng
// tính trung vị
const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? // trả về trung bình của chỉ số giữa và số sau đó
      average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};
//sử dụng tốc ký
const spreadsheetFunctions = {
  sum,average,median
};
const update = (event) => {
  const element = event.target;
  // làm sạch xoá tất cả khoảng trắng để thay thể 
  const value = element.value.replace(/\s/g,"");
  // điều kiện bắt buộc phải trỏ tới id đó và bắt đầu chữ đầu tiền phải là dấu bằng
  if (!value.includes(element.id) && value.startsWith("=")) {

  }
}

// chạy chức năng bạn cần phải có khả năng đánh giá
// đầu vào nó sẽ là số nguyên (parse)
const evalFormula = (x,cells) => {
  // tìm id từng ô
    const idToText = (id) => cells.find((cell) => cell.id === id).value;
    // lục soát từng ô để Regex
    const rangeRegex = /([A-J])/
  }