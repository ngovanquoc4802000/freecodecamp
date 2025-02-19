
 // cách 1:  const getAverage = (array) => array.reduce((acc,el) => acc + el) / array.length;
/* cách 2:   const getAverage = (array) => {
  let result = 0
  for(let i = 0; i < array.length;i++) {
    result += i
  }
  return result / array.length;
}
 */

// cách 3 
/* const getAverage = (array) => {
  const sum = 0;
  const i = 0 ;
  while (i < array.length) {
    sum += array[i];
    i++
  }
  return sum / array.length;
} */

getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]); //71.1
getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]);
getAverage([45, 87, 98, 100, 83, 94, 67, 88, 94, 95]); //156.8
getAverage([42, 84, 97, 57, 82, 78, 67, 84, 44, 86]); //228.9
getAverage([43, 88, 89, 87, 86, 94, 67, 82, 74, 95]); //309.4

const hasAverage = (score) => {
  if(score >= 100) {
    return "A+"
  } else if(score >= 90) {
    return "A"
  } else if(score >= 80) {
    return "B"
  } else if(score >= 70) {
    return "C"
  } else if(score >= 60) {
    return "D"
  } else {
    return "F"
  }
}

const conditionResult = (result,condition) => {
  const average = getAverage(result);
  const isAverage = hasAverage(condition);
  if(average !== "F") {
    return `Class average: ${average}. Your grade: ${isAverage}. You passed the course.`
  } else {
    return `Class average: ${average}. Your grade: ${isAverage}. You passed the course.`
  }
}
console.log(conditionResult([92, 88, 12, 77, 57, 100, 67, 38, 97, 89],37))
