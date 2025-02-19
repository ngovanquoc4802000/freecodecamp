const getMean = (arr) => arr.reduce((acc, el) => acc + el, 0) / arr.length;

const getMedian = (arr) => {
  const sorted = arr.sort((a, b) => {
    return a - b;
  });
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2 - 1], sorted[sorted.length / 2]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
};

const getMode = (arr) => {
  const counts = {};
  arr.forEach((el) => {
    if(counts[el]) {
      counts[el] + 1
    } else {
      counts[el] = 1
    }
  })
  if(new Set(Object.values(counts)).size === 1) {
    return null
  }
  const highest = Object.keys(counts).sort((a,b) => counts[b] - counts[a])[0];
  const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);
  return mode.join(", ")
}

const range = (arr) => {
  return Math.max(...arr) - Math.min(...arr)
}

const getVariance = (arr) => {
  const mean = getMean(arr);
  const variance = arr.reduce((acc,el) => {
      const difference = el - mean;
      const squared = difference ** 2;
      return acc + squared
  },0) / arr.length;
  return variance;
}

const getStandardDeviation  = (arr) => {
  const variance = getVariance(arr);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

const calculate = () => {
  const value = document.getElementById("numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));

  const mean = getMean(numbers);
  const median = getMedian(numbers);  
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const varian = getVariance(numbers)
  
  document.getElementById("mean").textContent = mean;
  document.getElementById("median").textContent = median;
  document.getElementById("mode").textContent = mode;
  document.getElementById("range").textContent = range;
  document.getElementById("variance").textContent = varian;
};
