// bạn sẽ có kinh nghiệm xử lý thông tin đầu vào của người dùng
// (calculator like mean) tính toán thống kê như giá trị trung bình
// (median) trung vị
// (mode) Phương sai
// standard deviation: độ lệch chuẩn
// varian: phương sai

// Thống kê là một cách sử dụng toán học để hiểu dữ liệu.
// Nó giúp chúng ta hiểu các mô hình và xu hướng
// thông tin để có thể đưa ra dự đoán và quyết định dựa trên thông tin đó.

// (calculator like mean) tính toán thống kê như giá trị trung bình
const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length;

//(median) trung vị: là trung điểm của một tập hợp số.
// nếu là số chẵn thì trả về 2 số ở giữa 1 mảng
const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
  // check if array length is chẵn
  //arr.length % 2 === 0;
  // check if array length is lẻ
  //arr.length % 2 === 1;
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2 - 1], sorted[sorted.length / 2]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
};

//Mode : đó là con số xuất hiện thường xuyên nhất trong danh sách
const getMode = (array) => {
  const counts = {};
  // ví dụ : 4425 thì có 2 số 4
  // { '2': 1, '4': 2, '5': 1 }
  array.forEach((el) => {
    // rút gọn: counts[el] = counts[el] ? counts[el] + 1 : 1
    //kiểm tra xem phần tử hiện tại có nằm trong đối tượng counts hay không
    if (counts[el]) {
      counts[el] += 1;
    } else {
      counts[el] = 1;
    }
  });
  // trường hợp nhiều số trùng
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
};

//Ranger : sự khác biệt giữa số lớn nhất và số nhỏ nhất trong danh sách.
const getRange = (array) => {
  //sử dụng spread
  return Math.max(...array) - Math.min(...array);
};

//variance: đo lường mức độ trung bình của các giá trị so với giá trị trung bình
const getVariance = (array) => {
  const mean = getMean(array);
  // Bước tiếp theo là tính toán khoảng cách giữa mỗi phần tử

  // so với giá trị trung bình.

  //const differences = array.map((el) => el - mean);

  // bình phương từng sự khác biệt

  // example: 3 ** 2 would return 9.

  //const squaredDifferences = differences.map((el) => el ** 2);

  //bạn cần lấy tổng của các bình phương khác nhau

  /*   const sumSquaredDifferences = squaredDifferences.reduce(
    (acc, el) => acc + el,
    0
  ); */
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
};

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g); //đổi phần tử nhỏ thành các kí tự đặc biệt
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));
  //NaN viêt tắt không phải là số
  const mean = getMean(numbers);

  const median = getMedian(numbers);

  const mode = getMode(numbers);
 
  const range = getRange(numbers);
   
  const variance = getVariance(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
};
