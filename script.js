// ------------------------------------------------------
// Function: Escape HTML to prevent XSS attacks
// ------------------------------------------------------

function escapeHTML(text) {

    const div = document.createElement("div"); // Create temporary element
    div.textContent = text; // Browser escapes any HTML automatically
    return div.innerHTML; // Return safe text

}



// ------------------------------------------------------
// DOM Elements
// ------------------------------------------------------

const taskInput = document.getElementById("taskInput");       // Task input field
const energyTag = document.getElementById("energyTag");       // Energy tag dropdown
const addTaskBtn = document.getElementById("addTaskBtn");     // Add task button
const taskList = document.getElementById("taskList");         // Task list container
const progressBar = document.getElementById("progress");      // Progress bar element
const privacyToggle = document.getElementById("privacyToggle"); // Incognito toggle button



// ------------------------------------------------------
// Load tasks from localStorage
// ------------------------------------------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Task storage
let currentFilter = "all";                                   // Current filter state
let incognitoMode = false;                                   // Incognito mode flag



// ------------------------------------------------------
// Event Listeners
// ------------------------------------------------------

// Add task by clicking button
addTaskBtn.addEventListener("click", addTask);

// Allow adding task with ENTER key
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        event.preventDefault(); // Prevent form refresh
        addTask();

    }

});



// ------------------------------------------------------
// Function: Add new task
// ------------------------------------------------------

function addTask() {

    const text = escapeHTML(taskInput.value.trim()); // Sanitize input
    const energy = energyTag.value;

    // Prevent empty tasks
    if (text === "") {

        alert("Task cannot be empty");
        return;

    }

    // Prevent extremely long tasks
    if (text.length > 100) {

        alert("Task must be under 100 characters.");
        return;

    }

    // Create task object
    const task = {

        id: Date.now(),
        text: text,
        energy: energy,
        completed: false

    };

    // Add task to list
    tasks.push(task);

    // Save tasks
    saveTasks();

    // Clear input field
    taskInput.value = "";

    // Update UI
    renderTasks();

}



// ------------------------------------------------------
// Function: Render tasks to UI
// ------------------------------------------------------

function renderTasks() {

    taskList.innerHTML = ""; // Clear list

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



    // --------------------------------------------------
    // Empty State UI
    // --------------------------------------------------

    if (filteredTasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty-state";

        emptyMessage.innerHTML = `
            <span>No tasks yet ✏️</span>
            <small>Add something to get started</small>
        `;

        taskList.appendChild(emptyMessage);

        updateProgress();
        return;

    }



    // --------------------------------------------------
    // Render Tasks
    // --------------------------------------------------

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>${task.text} (${task.energy})</span>

            <div class="task-actions">
                <button onclick="toggleTask(${task.id}, this)">✔</button>
                <button onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);

    });

    updateProgress();

}



// ------------------------------------------------------
// Function: Toggle task completion
// Includes burn animation
// ------------------------------------------------------

function toggleTask(id, btn) {

    const taskElement = btn.closest("li");

    taskElement.classList.add("burn"); // Trigger animation

    setTimeout(() => {

        tasks = tasks.map(task => {

            if (task.id === id) {

                task.completed = !task.completed;

            }

            return task;

        });

        saveTasks();
        renderTasks();

    }, 400);

}



// ------------------------------------------------------
// Function: Delete task
// ------------------------------------------------------

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();

}



// ------------------------------------------------------
// Function: Save tasks to localStorage
// ------------------------------------------------------

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// ------------------------------------------------------
// Function: Update progress bar
// ------------------------------------------------------

function updateProgress() {

    const progressText = document.getElementById("progressText");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    let percent = 0;

    if (totalTasks > 0) {

        percent = Math.round((completedTasks / totalTasks) * 100);

    }

    // Update progress bar width
    progressBar.style.width = percent + "%";

    // Update progress label
    if (progressText) {

        progressText.textContent = percent + "% complete";

    }

    // Optional visual highlight when completed
    if (percent === 100) {

        progressBar.style.background = "black";

    } else {

        progressBar.style.background = "";

    }

}



// ------------------------------------------------------
// Filter button logic
// ------------------------------------------------------

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.getAttribute("data-filter");

        renderTasks();

    });

});



// ------------------------------------------------------
// Incognito Mode Toggle
// ------------------------------------------------------

privacyToggle.addEventListener("click", () => {

    incognitoMode = !incognitoMode;

    if (incognitoMode) {

        taskList.classList.add("incognito");
        privacyToggle.innerText = "Disable Incognito";

    } else {

        taskList.classList.remove("incognito");
        privacyToggle.innerText = "Incognito Mode";

    }

});



// ------------------------------------------------------
// Initial Render on Page Load
// ------------------------------------------------------

renderTasks();