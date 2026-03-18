
// DOM Elements


const taskInput = document.getElementById("taskInput");
const energyTag = document.getElementById("energyTag");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");



// Load tasks from localStorage
// If nothing exists → uses empty array


let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Array of task objects



// Add task button click event


addTaskBtn.addEventListener("click", addTask);



// Function: Add a new task

function addTask() {

    const text = taskInput.value.trim();
    const energy = energyTag.value;

    // Prevent empty tasks
    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),     // unique id
        text: text,
        energy: energy,
        completed: false
    };

    // Add task to array
    tasks.push(task);

    // Save tasks in localStorage
    saveTasks();

    // Clear input field
    taskInput.value = "";

    // Re-render tasks
    renderTasks();
}



// Function: Render tasks on UI

function renderTasks() {

    // Clear existing list
    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        // Apply completed style
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



// Function: Toggle task complete


function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    // Save updated tasks
    saveTasks();

    // Re-render UI
    renderTasks();
}


// Function: Delete task


function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    // Save updated tasks
    saveTasks();

    // Re-render UI
    renderTasks();
}



// Function: Save tasks to localStorage


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



// Render tasks when page loads


renderTasks();