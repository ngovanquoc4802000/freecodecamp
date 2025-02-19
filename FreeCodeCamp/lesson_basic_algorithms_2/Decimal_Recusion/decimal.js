/* bắt đầu làm đệ quy thay vì vòng lặp */
/* a tack(ngăn xếp): là 1 cấu trúc dữ liệu trong đó các mục được lưu trữ 
theo cách LIFO(vào trước ra trước);
 - vd : cuốn sách cuối cùng bạn thêm vào ngăn sách là cuối sách đầu tiên bạn
có thể lấy ra khỏi ngăn xếp, (push and pop) 
*/
/* 
const a = () => {
  return "freeCodeCamp " + b();
};

const b = () => {
  return "is " + c();
};

const c = () => {
  return "awesome!";
};

const callStack = [
  'a(): returns "freeCodeCamp" + "is awesome!"',
]; */

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

/* const countDownAndUp  = (number) => {
  console.log(number); // 3 2 1 0
  if(number === 0) {
    console.log("Reached base case")
    return 
  } else {
    countDownAndUp(number - 1)
  }
  console.log(number); // 1 2 3
}
countDownAndUp(3) */
/* Điều này là do sau khi vòng lặp đệ quy kết thúc, hàm sẽ tiếp tục thực thi mã sau lệnh gọi đệ quy. */
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    window.alert("Please provide a decimal number greater than or equal to 0");
    return; //base case
  }
  if (inputInt === 5) {
    showAnimation();
    return;
  }
  /* decimalToBinaryCach1(inputInt); */
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};
/* | Base-10 | Base-2 |
| ------- | ------ |
|    0    |  0     |
|    1    |  1     |
|    2    |  10    |
|    3    |  11    |
|    4    |  100   |
|    5    |  101   |
|    6    |  110   |
|    7    |  111   |

|    8    |  1000  |
|    9    |  1001  |
|    10    |  1010  |
|    11    |  1011  |

|    12    |  1100  |
|    13    |  1101  |
|    14    |  1110  |
|    15    |  1111  |
*/

//Bit: là đơn vị nhỏ nhất của thông tin máy tính , chỉ có 0 hoặc 1
//Byte: 1byte = 8 bit (01101011), nghĩa là 1byte có thể biểu diễn 2^8 = 256 giá trị khác nhau

//Byte dùng để: lưu trữ dữ liệu (image , video)

//1 bức ảnh : 2MB = 2 triệu byte
// 1 bài hát : 5MB = 5 triệu byte

/* thực hiện đệ quy */
/* const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input); //base case không được phép có hàm else if
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
}; */

const showAnimation = () => {
  setTimeout(() => {
    console.log("free");
  }, 500);
  setTimeout(() => {
    console.log("Code");
  }, 1000);
  setTimeout(() => {
    console.log("Camp");
  }, 1500);
}; //bước giúp định hình đệ quy
showAnimation();

// event keydown kích hoạt mỗi khi người dùng nhấn 1 phím inter

convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
  console.log(e);
});
