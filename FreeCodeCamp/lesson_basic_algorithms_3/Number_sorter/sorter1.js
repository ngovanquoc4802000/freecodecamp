const sort = document.getElementById("sort");

const sortInputArray = (e) => {
  e.preventDefault();
  const inputValues = [...document.querySelectorAll(".values-dropdown")].map(
    (item) => Number(item.value)
  );

  /* cách 1:  
 const sorted = inputValues.sort((a, b) => {
    return a - b;
  }); */

  /* const sorted = bubbleSort(inputValues) */
  const sorted = insertionSort(inputValues);
  updateUI(sorted);
};

/* thuật toán bông bống */
/* const bubbleSort = (array) => {
  for(let i = 0 ; i < array.length; i++) {
    for(let j  = 0; j < array.length;j++) {
      if(array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp;
      }
    }
  }
  return array;
}
 */

//thuật toán tìm giá trị nhỏ nhất
/* const selectionSort = (array) => {
  for(let i = 0 ; i < array.length; i ++) {

    let minIndex = i

    console.log(minIndex)
    for(let j = i + 1; j < array.length ;j++) {
      if(array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp
  }
  return array;
} */

// Thuật toán sắp xếp chèn
/* const insertionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let currValue = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
}; */

const updateUI = (array = []) => {
  array.forEach((item, id) => {
    const outputValueNode = document.getElementById(`output-value-${id}`);
    outputValueNode.innerText = item;
  });
};

sort.addEventListener("click", sortInputArray);
