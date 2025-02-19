const testArr1 = [1, 2, 3, 4, 5];
const testArr2 = [1, 2, 3, 4, 5, 6];
// đây là cách lấy số chẵn
const isEven = testArr2.length % 2 === 0;
// đây là cách lấy số lẻ
const isOdd = testArr2.length % 2 === 1;
console.log(isEven);
// Đây là cách lấy số lẻ ở giữa phần tử mảng
const oddListMedian = testArr1[Math.floor(testArr1.length / 2)]
console.log(oddListMedian);
// Để tìm số trung vị, 
// bạn có thể sử dụng hàm getMean để cộng các số ở giữa và chia tổng cho 2.
const evenListMedian = getMean([testArr2[testArr2.length / 2 - 1], testArr2[testArr2.length / 2]]);
console.log(evenListMedian)