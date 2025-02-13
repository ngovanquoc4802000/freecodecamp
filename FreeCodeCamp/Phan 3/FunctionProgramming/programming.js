// logic tạo các logic nhỏ thành các logic lớn để tái sử dụng

// Hàm tạo Array() có phương thức .fill() có thể được sử dụng
// để điền 1 giá trị vào  1 mảng
// vd fill():
// value: giá trị mới mà bạn muốn điền vào phần tử
// start: chỉ số bắt đầu (tính từ 0) của phần tử đầu tiên cần thay đổi.Mặc định là 0
// end: chỉ số kết thúc (không bao gồm) của phàn tử cuối cùng cần thay đổi.Mặc định là độ dài của mảng

// let numbers = [1, 2, 3, 4, 5];
// numbers.fill(10, 2, 4); // 2 - 4
// console.log(numbers); // Output: [0, 0, 10, 10, 0]
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);

const charRange = (start, end) =>
  range(start.charCodeAt(0) , end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

window.onload = () => {
  const container = document.getElementById("container");
  // các function programming lý tưởng cho logic có thể tái sử dụng
  const createLabel = (name) => {
    // .createElement(): tạo 1 thẻ div
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    // thẻ cha bao thẻ con
    container.appendChild(label);
  };
  
  const letters = charRange("A","J");
  letters.forEach(createLabel);
  range(1,99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      container.appendChild(input)
    });
  })
};

//Hầu hết các chương trình bảng tính đều có sẵn các hàm tính toán tích hợp.
const sum = (nums) => nums.reduce((acc,el) => acc + el,0)

const isEven = (num) => num % 2 === 0 ? true : false;