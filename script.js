
// Function: Escape HTML to prevent XSS-----------------------------


function escapeHTML(text) {

    const div = document.createElement("div");// Create a temporary div element
    div.textContent = text;// Set the text content to the input text (automatically escapes HTML)
    return div.innerHTML;// Return the escaped HTML

}
// DOM Elements -----------------------------


const taskInput = document.getElementById("taskInput");   // Task input field
const energyTag = document.getElementById("energyTag");   // Energy tag dropdown
const addTaskBtn = document.getElementById("addTaskBtn"); // Add task button
const taskList = document.getElementById("taskList");     // Task list container
const progressBar = document.getElementById("progress");  // Progress bar element
const privacyToggle = document.getElementById("privacyToggle"); // Privacy toggle button




// Load tasks from localStorage-----------------------------


let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Task array
let currentFilter = "all";   // Current filter
let incognitoMode = false;   // Incognito mode flag




// Add task button click event-----------------------------


addTaskBtn.addEventListener("click", addTask);
// Allow adding task with ENTER key
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});
// Prevent form submission on ENTER key
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();
        addTask();

    }

});


// Validate task length-----------------------------
if (text.length > 100) {
    alert("Task must be under 100 characters.");
    return;
}

// -----------------------------
// Function: Add a new task
// -----------------------------

function addTask() {

    const text = escapeHTML(taskInput.value.trim());// Get and escape task text and user input is sanitized before rendering
    const energy = energyTag.value;

    // Prevent empty tasks
    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: text,
        energy: energy,
        completed: false
    };

    // Add task
    tasks.push(task);

    // Save tasks
    saveTasks();

    // Clear input
    taskInput.value = "";

    // Re-render UI
    renderTasks();
}



// -----------------------------
// Function: Render tasks
// -----------------------------

function renderTasks() {

    // Clear list
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

    // Show empty state if no tasks exist
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


    // Render tasks

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

    // Update progress bar
    updateProgress();
}



// -----------------------------
// Function: Toggle task completion
// Includes burn animation
// -----------------------------

function toggleTask(id, btn) {

    const taskElement = btn.closest("li");

    // Burn animation
    taskElement.classList.add("burn");

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



// -----------------------------
// Function: Delete task
// -----------------------------

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}



// -----------------------------
// Function: Save tasks
// -----------------------------

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// -----------------------------
// Function: Update progress bar
// -----------------------------

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

    // Update progress text
    if (progressText) {
        progressText.textContent = percent + "% complete";
    }

    // Optional: highlight when 100% completed
    if (percent === 100) {
        progressBar.style.background = "black";
    } else {
        progressBar.style.background = "";
    }

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



// -----------------------------
// Incognito Mode Toggle
// -----------------------------

privacyToggle.addEventListener("click", () => {

    incognitoMode = !incognitoMode;

    if (incognitoMode) {
        taskList.classList.add("incognito");
        privacyToggle.innerText = "Disable Incognito";
    }
    else {
        taskList.classList.remove("incognito");
        privacyToggle.innerText = "Incognito Mode";
    }

});



// -----------------------------
// Render tasks when page loads
// -----------------------------

renderTasks(); t