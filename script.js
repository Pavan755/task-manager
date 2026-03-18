// -----------------------------
// DOM Elements
// -----------------------------

const taskInput = document.getElementById("taskInput");   // Task input field
const energyTag = document.getElementById("energyTag");   // Energy tag dropdown
const addTaskBtn = document.getElementById("addTaskBtn"); // Add task button
const taskList = document.getElementById("taskList");     // Task list container
const progressBar = document.getElementById("progress");  // Progress bar element



// -----------------------------
// Load tasks from localStorage
// If nothing exists → use empty array
// -----------------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";   // Default filter



// -----------------------------
// Add task button click event
// -----------------------------

addTaskBtn.addEventListener("click", addTask);



// -----------------------------
// Function: Add a new task
// -----------------------------

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
        id: Date.now(),   // Unique ID
        text: text,
        energy: energy,
        completed: false
    };

    // Add task to array
    tasks.push(task);

    // Save tasks to localStorage
    saveTasks();

    // Clear input field
    taskInput.value = "";

    // Re-render UI
    renderTasks();
}



// -----------------------------
// Function: Render tasks on UI
// -----------------------------

function renderTasks() {

    // Clear existing list
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply filters
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (currentFilter === "quick") {
        filteredTasks = tasks.filter(task => task.energy === "quick");
    }

    if (currentFilter === "deep") {
        filteredTasks = tasks.filter(task => task.energy === "deep");
    }


    // Display tasks
    filteredTasks.forEach(task => {

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

    // Update progress bar
    updateProgress();
}



// -----------------------------
// Function: Toggle task complete
// -----------------------------

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    // Save tasks
    saveTasks();

    // Re-render UI
    renderTasks();
}



// -----------------------------
// Function: Delete task
// -----------------------------

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    // Save tasks
    saveTasks();

    // Re-render UI
    renderTasks();
}



// -----------------------------
// Function: Save tasks to localStorage
// -----------------------------

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// -----------------------------
// Function: Update progress bar
// -----------------------------

function updateProgress() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const percent = total === 0 ? 0 : (completed / total) * 100;

    progressBar.style.width = percent + "%";

}



// -----------------------------
// Filter button logic
// -----------------------------

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.getAttribute("data-filter");

        renderTasks();

    });

});



// Render tasks when page loads


renderTasks();