// DOM elements
const taskInput = document.getElementById("taskInput");
const energyTag = document.getElementById("energyTag");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Task array
let tasks = [];

// Add task button click
addTaskBtn.addEventListener("click", addTask);

function addTask() {

    const text = taskInput.value.trim();
    const energy = energyTag.value;

    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        energy: energy,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

// Render tasks
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>${task.text} (${task.energy})</span>

            <div class="task-actions">

                <button onclick="toggleTask(${task.id})">✔</button>
                <button onclick="deleteTask(${task.id})">🗑</button>

            </div>
        `;

        taskList.appendChild(li);
    });

}

// Toggle complete
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    renderTasks();
}

// Delete task
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
}