
// DOM Elements


const taskInput = document.getElementById("taskInput");
const energyTag = document.getElementById("energyTag");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");



// Load tasks from localStorage
// If nothing exists → uses empty array


let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Array of task objects
let currentFilter= "all"; // Default filter for energy tags


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


function renderTasks() {
    // Clear existing list
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply filters based on currentFilter value
    if (currentFilter !== "active") {
        filteredTasks = tasks.filter(task => task=> !task.completed);

    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (currentFilter === "quick")  {
        filteredTasks = tasks.filter(task => task.energy === "quick");
    }

    if (currentFilter ==="deep") {
        filteredTasks = tasks.filter(task => task.energy === "deep");
    }

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

}

// filter button logic
const filterButtons = document.querySelectorAll(".filters button"); // Select all filter buttons

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.getAttribute("data-filter"); // Update current filter based on button's data-filter attribute

        renderTasks(); // Re-render tasks with the new filter applied

    });

});