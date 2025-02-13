//Bạn có thể sử dụng vòng lặp để lặp lại mảng điểm số và cộng tất cả điểm số.
//Bạn có thể sử dụng thuộc tính length để lấy tổng số điểm.
/* --------------- Bai 1 --------- */

function getAverage(numLength) {
  let sum = 0;  
  for (const num of numLength) {
    sum += Math.floor(num);
  }
  return sum / numLength.length;
}

getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]); //71.1
getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]);
getAverage([45, 87, 98, 100, 83, 94, 67, 88, 94, 95]); //156.8
getAverage([42, 84, 97, 57, 82, 78, 67, 84, 44, 86]); //228.9
getAverage([43, 88, 89, 87, 86, 94, 67, 82, 74, 95]); //309.4

/* -------------Bai 2 --------- */

function getGrade(score) {
  if(score === 100) {
    return "A++"
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

getGrade(96);//A
getGrade(82);//B
getGrade(56);//F

//điều kiện không thuộc F

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  /* lấy function đã làm đc gọi lại trong hàm fn */
  const average = getAverage(totalScores);

  const grade = getGrade(studentScore);
  
  if(grade !== "F") {
  
    return `Class average: ${average}. Your grade: ${grade}. You passed the course.`
  
  } else {
  
    return `Class average: ${average}. Your grade: ${grade}. You failed the course.`

  }
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));