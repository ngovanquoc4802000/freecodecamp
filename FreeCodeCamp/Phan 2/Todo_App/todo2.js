const openTaskFormBtn = document.getElementById("open-task-form-btn");
const cancelButton = document.getElementById("cancel-btn");
const discardButton = document.getElementById("discard-btn");
const addOrUpdateBtn = document.getElementById("add-or-update-task-btn");
const takForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");

const task = [];
const taskData = JSON.parse(localStorage.getItem("data"))|| [];
let currentTask = {}

const addOrUpdateTask = () => {
   const hasIndex = taskData.findIndex((item) => item.id === currentTask.id);
   const taskObj = {
     id: `${titleInput.value.toLowerCase().split(" ").join("-")}`,
     title: titleInput.value,
     date: dateInput.value,
     description: descriptionInput.value
   }
   if(hasIndex === - 1) {
      taskData.unshift(taskObj)
   } else {
      taskData[hasIndex] = taskObj
   }
   localStorage.setItem("data",JSON.stringify(taskData))
   renderContainer()
   reset()
}

const renderContainer = () => {
  taskContainer.innerHTML = ``;
   taskData.forEach(({id,title,date,description}) => {
     taskContainer.innerHTML += `
      <div class="task" id="${id}">
          <p>
            Title: 
            <strong>${title}</strong>
          </p>
          <p>
            Date: 
            <strong>${date}</strong>
          </p>
          <p>
            Description: 
            <strong>${description}</strong>
          </p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
      </div>
     ` 
  })

}

const editTask = (buttonEl) => {
  const findIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
  currentTask = taskData[findIndex];
  
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  localStorage.setItem("data",JSON.stringify(taskData))
  addOrUpdateBtn.innerText = "Update Task";
  takForm.classList.toggle("hidden");
}

const deleteTask = (buttonEl) => {
   const findIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
   buttonEl.parentElement.remove();
   taskData.splice(findIndex,1);
   localStorage.setItem("data",JSON.stringify(taskData))
}

cancelButton.addEventListener("click",() => {
  confirmCloseDialog.close();
})

closeTaskFormBtn.addEventListener("click",() => {
  const formTargetUpdate = titleInput.value === currentTask.title ||
  dateInput.value === currentTask.date || descriptionInput.value === currentTask.description;

  const formTargetInputValue = titleInput.value || dateInput.value || descriptionInput.value
  if(formTargetInputValue && formTargetUpdate) {
    confirmCloseDialog.showModal();
  } else {
    reset()
  }
})

openTaskFormBtn.addEventListener("click",() => {
  takForm.classList.toggle("hidden")
})

if(taskData.length > 0) {
  renderContainer()
}
takForm.addEventListener("submit", (e) => {
  e.preventDefault()
  addOrUpdateTask()
})
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value =""
  currentTask = "";
  takForm.classList.toggle("hidden")
}