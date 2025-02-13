// bắt đầu với 1 bộ chứa HTML cơ bản

// nó có thuộc tính onload cho phép bạn xác định hành vi khi cửa sổ tải toàn bộ trang

const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map(code =>
    String.fromCharCode(code)
  );


// tìm số chẵn và lẻ
const isEven = (num) => (num % 2 === 0 ? true : false);

//tính tổng các phần tử element
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);

//chia cho tổng
const average = (num) => sum(num) / num.length;

const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

//thuộc tính đối tượng bao gồm các cặp khoá/ giá trị
const spreadsheetFunctions = {
  sum,
  average,
  median,
};

// chạy các chức năng bảnh tính của bạn
// bạn cần có khả năng phân tích và đánh giá chuỗi đầu vào
/// đây là 1 thời gian tuyệt vời để sử dụng
    
const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value; // xác định được value

  // bạn cần có khả năng khớp các phạm vi ô trong một công thức
  // phạm vi ô có thể trông giống như A1:B12 hoặc A3:25
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; // duyệt từng ô

  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2)); // cho nó là số nguyên

  const elemValue = (num) => { 
    const inner = (character) => {
      return idToText(character + num);
    }; 
    return inner;
  };
};

const update = (event) => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  // điều kiện bắt buộc phải trỏ tới id đó và bắt đầu chữ đầu tiền phải là dấu bằng
  if (!value.includes(element.id) && value.startsWith("=")) {
  }
};



//window là đối tượng cửa sổ chung đại diện cho cửa sổ trình duyệt
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
      input.ariaLabel = letter + number;
      // update
      input.onchange = update;

      container.appendChild(input);
    });
  });
};
