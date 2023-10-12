// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
    `;

    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to edit a task
function editTask(button) {
    const span = button.parentElement.querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null) {
        span.textContent = newText;
        saveTasksToLocalStorage();
    }
}

// Function to delete a task
function deleteTask(button) {
    const li = button.parentElement;
    const taskList = li.parentElement;
    taskList.removeChild(li);
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];
    for (const li of taskList.querySelectorAll("li")) {
        const text = li.querySelector("span").textContent;
        tasks.push(text);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const taskList = document.getElementById("taskList");
        for (const text of tasks) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${text}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(li);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTaskButton");

    if (addTaskButton) {
        addTaskButton.addEventListener("click", addTask);
    }

    const taskList = document.getElementById("taskList");

    if (taskList) {
        taskList.addEventListener("click", function (event) {
            if (event.target.classList.contains("edit-button")) {
                editTask(event.target);
            } else if (event.target.classList.contains("delete-button")) {
                deleteTask(event.target);
            }
        });
    }

    loadTasksFromLocalStorage();
});
