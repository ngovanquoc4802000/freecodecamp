const getMean = (array) => array.reduce((acc, el) => acc + el) / array.length;

const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? getMean(sorted[sorted.length / 2 - 1], sorted[sorted.length / 2])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
};

const getMode = (array) => {
  const object = {};

  array.forEach((el) => {
    if (object[el]) {
      object[el] += 1;
    } else {
      object[el] = 1;
    }
  });

  if (new Set(Object.values(object)).size === 1) {
    return null;
  }

  const highest = Object.keys(object).sort((a, b) => {
    object[b] - object[a];
  })[0];

  const mode = Object.keys(object).filter(
    (el) => object[el] === object[highest]
  );
  return mode.join(", ");
};

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
};

const getVariance = (array) => {
  //tính giá trị trung binhf
  const mean = getMean(array);
  const varian =
    array.reduce((acc, el) => {
      //tính độ lệch của mỗi giá trị
      const difference = el - mean;
      // Bỉnh phương của các độ lệch
      const squared = difference ** 2;
      // trung bình cộng
      return acc + squared;
    }, 0) / array.length;
  return varian;
};
//standard: là căn bậc 2 của phương sai
// để tích căn bậc 2 js có tích hợp sẵn Math.pow()
// đối tượng Math có 1 method đặc biệt để tìm căn bậc 2 của một số .sqrt()
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
};

const calculate = () => {
  const input = document.getElementById("numbers").value;
  const array = input.split(/,\s*/g);
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));

  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};


