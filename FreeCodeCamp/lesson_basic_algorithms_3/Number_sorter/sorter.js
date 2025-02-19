//Học tư duy thuật toán cơ bản bằng cách xây dựng bộ sắp xếp số, chưa bắt đầu

//1.các thuật toán sắp xếp như sắp xếp bong bóng,

//2.sắp xếp lựa chọn

//3.sắp xếp chèn
const sortButton = document.getElementById("sort");
// bien 1 phan tu thanh 1 mang trai? rong
// const inputValues = [...document.getElementsByClassName("values-dropdown")];

const sortInputArray = (event) => {
  event.preventDefault();
  //.getElementsByClassName() : là 1 đối tượng giống như mảng gồm tất cả các
  //phần tử giống nhau
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value));

  /*  const sortedValues = bubbleSort(inputValues) */
  /* const sortedValues = selectionSort(inputValues); */
 /*  const sortedValues = insertionSort(inputValues); */
  const sortedValues = inputValues.sort((a,b) => {
   return a - b;
  })
  //sau khi thêm 10 vào thì lại bị bung ra
  updateUI(sortedValues);
};

const updateUI = (array = []) => {
  array.forEach((num, index) => {
    const outputValueNode = document.getElementById(`output-value-${index}`);
    outputValueNode.innerText = Number(num);
  });
};

//thuật toán bong bóng với số trong mảng
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        /* biến tạm temp để lưu trữ giá trị của phần tử hiện tại */
        const temp = array[j];
        /* giá trị của phần tử tiếp theo được gán cho phần tử hiện tại */
        array[j] = array[j + 1];
        /* giá tị ban đầu của phần tử hiện tại (được lưu trong temp) được gán cho
        phần tử tiếp theo. Điều này hoán đổi vị trí của 2 yếu tố 1 cách hiệu quả
        */
        array[j + 1] = temp;
      }
    }
  }
  return array;
};

// Sắp xếp lựa chọn hoạt động bằng cách tìm giá trị nhỏ nhất trong mảng
// sau đó hoán đổi nó với giá trị đầu tiên trong mảng
// sau đó nó tìm giá trị nhỏ nhất tiếp theo trong mảng
// và hoán đổi nó với giá trị thứ 2 trong mảng
// Nó tiếp tục lặp qua mảng cho đến khi được sắp xếp hoàn toàn

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i; // gán giá trị cần tìm

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
};

//Thuận toán Sắp xếp chèn
// Xây dựng 1 mảng được sắp xếp ở đầu danh sách
// Nó bắt đầu mảng được sắp xếp với phần tử đầu tiên
// Sau đó, nó kiểm tra phần tử tiếp theo
// và hoán đổi nó ngược vào mảng đã sắp xếp cho đến khi nó ở vị trí được sắp xếp, v.v.
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
};

// phương thức sort()

sortButton.addEventListener("click", sortInputArray);
