// Grab references to elements in the DOM
const todoInput = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

// Load existing tasks from local storage on page load
window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
});

// Function to create a new task element
function createTaskElement(text, completed = false) {
  const taskItem = document.createElement("li");
  if (completed) {
    taskItem.classList.add("completed");
  }

  taskItem.innerHTML = `
    <span>${text}</span>
    <button>Delete</button>
  `;

  // Mark task as complete on click
  taskItem.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasks();
  });

  // Delete task on button click
  taskItem.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering the 'complete' event
    taskItem.remove();
    saveTasks();
  });

  // Append task to the list
  todoList.appendChild(taskItem);
  saveTasks();
}

// Add new task when button is clicked
addTaskBtn.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (taskText) {
    createTaskElement(taskText);
    todoInput.value = "";
  }
});

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("ul#todo-list li").forEach(task => {
    tasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed"),
     });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
