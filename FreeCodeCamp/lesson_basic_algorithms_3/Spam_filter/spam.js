const messageInput = document.getElementById("message-input");
const checkMessageButton = document.getElementById("check-message-btn");
const result = document.getElementById("result");


const helpRegex = /please help| assist me/i;

// i là chữ hoa với chữ thường
// s* s+ là xoá bỏ các khoảng trắng
// g là tìm tất cả các sự trùng khớp của 1 mẫu trong 1 chuỗi 

//[0-9]+ từ 0 đến 9
// \d cũng đại diện cho bất kì chữ số nào ( tương đương với [0-9]) 


//A capture group: 1 nhóm bắt giữ và thêm dấu ? là đã tuỳ chọn 

//Một điều cuối cùng với biểu hiện này.
// Bạn thực sự không cần giá trị đối sánh từ nhóm chụp của mình,
// vì vậy bạn có thể biến nó thành nhóm không chụp.
// Điều này sẽ cho phép bạn nhóm các ký tự lại với nhau mà không giữ nguyên kết quả.
// => thêm dấu chấm hỏi
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
// chữ o là [o0]
// chữ e là [e3]
// chứ s là [s5]
// chữ t là [t7]
// chữ a là [a@4]
// chữ c là [c{[()]
// chữ r là [i1|]
// khớp toàn bộ đầu với đuôi: (?:^|\s)
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
const dearRegex = /(?:^|\s)d[e3][a@4][i1|]fri[e3]nd(?:$|\s)/i;


const denyList = [helpRegex,dollarRegex,freeRegex,stockRegex,dearRegex];
console.log(denyList)
// mảng có method some() trả về điều kiện true or false, 
// arr.some(letter => letter === letter.toUpperCase());
// filter() trả về điệu kiện true or false; 
//alternate sequence : trinh tu thay the |
const isSpam = (msg) => denyList.some(regex => regex.test(msg));


// Biểu thức chính quy tiếp theo mà bạn sẽ xử 
// lý là biểu thức khớp với số tiền bằng đô la.
// i là không phân biệt chữ hoa và chữ thường

checkMessageButton.addEventListener("click",() => {
  if(messageInput.value === "") {
    alert("Please enter a message.");
    return
  };
  result.textContent = isSpam(messageInput.value) ? "Oh no! This looks like a spam message.":"This message does not seem to contain any spam."
  messageInput.value = "";
})