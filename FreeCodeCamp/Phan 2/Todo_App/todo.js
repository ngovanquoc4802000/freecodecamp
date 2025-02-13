//local storage là 1 tính năng của trình duyệt web cho phép các ứng dụng web lưu trữ liên tục các cặp key-value trong trình duyệt của người dùng
// cho phep các ứng dụng web lưu trữ dữ liệu trong 1 phiên , sau đó truy xuất dữ liệu đó ở trang sau
// create,read,update,delete
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const numberInput = document.getElementById("number-input");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

//taskData: theo dõi task,hiển thị chúng trên trang, và lưu chúng vào localStorage
const taskData = JSON.parse(localStorage.getItem("data")) || []; // chuyển chúng về 1 mảng
//currentTask : sử dụng để theo dõi trạng thái khi edit và discard
let currentTask = {};

/* Bạn có thể nâng cao khả năng đọc và bảo trì mã bằng cách
tái cấu trúc trình 
xử lý sự kiện gửi thành hai hàm riêng biệt.
 */

function removeString(str) {
  return str.replace(/[^a-zA-Z0-9\s]/g, "");
}

const addOrUpdateTask = () => {
  //bạn hãy xem task đã có trong mảng hay chưa
  // sử dụng phương thức findIndex(): mảng tìm và trả về chỉ mục của phần tử đầu tiên trong mảng
  // đáp ứng các tiêu chí được chỉ định
  // nếu k tìm thấy trả về -1
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  const taskObj = {
    id: `${removeString(titleInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    number: Number(numberInput.value),
    title: removeString(titleInput.value),
    date: dateInput.value,
    description: remove(descriptionInput.value),
  };
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }
  /* lưu */
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; // ghi nhớ đoạn này

  //ngay lúc này bị duplicated ta chuyen tasksContainer.innerHTML += "" ra ngoai
  taskData.forEach(({ id, number, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Number:</strong> ${number}</p>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `;
  });
};

const deleteTask = (buttonEl) => {
  // tìm hiểu  tại sao có parentElement
  //Splice: là một phương thức mảng sửa đổi mảng bằng cách xóa,

  // thay thế hoặc thêm các phần tử tại một chỉ mục đã chỉ định, đồng thời trả về các phần tử đã bị xóa.

  //Nó có thể có tối đa ba đối số: đối số đầu tiên là chỉ mục bắt buộc

  // để bắt đầu, đối số thứ hai là số mục cần xóa và đối số thứ ba là phần tử thay thế tùy chọn.
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  numberInput.value = currentTask.number;
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};

const reset = () => {
  numberInput.value = "";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
  addOrUpdateTaskBtn.innerText = "Add Task";
};

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

/* Modal: là 1 phần tử ngăn cản mọi tương tác với các phần tử bên ngoài nó 
cho đến khi phương thức đó bị loại bỏ
*/

closeTaskFormBtn.addEventListener("click", () => {
  /* check close */
  const formInputsContainValues =
    numberInput.value !== currentTask.value ||
    titleInput.value ||
    dateInput.value ||
    descriptionInput.value;
  /* check close khi nguoi dang chinhr suaw */
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
  //nếu người dùng cố gắng chỉnh sửa task nhưng quyết định không thực hiện
  // bất kì thay đổi nào trước khi đóng biểu mã
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});

//localStorage: Cung cấp các phương pháp để lưu , truy xuất và xoá các mục bất kì data type nào

// setItem("data",arr: cần lưu, sử dụng JSON.stringify()): lưu

// JSON.parse(localStorage.getItem()): lấy

// removeItem("data"): xoá 1 item

// clear(): xoá toàn bộ
