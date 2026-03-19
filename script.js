// ------------------------------------------------------
// Function: Escape HTML to prevent XSS attacks
// ------------------------------------------------------

function escapeHTML(text) {

    const div = document.createElement("div"); // Temporary element
    div.textContent = text; // Automatically escapes HTML
    return div.innerHTML;

}



// ------------------------------------------------------
// DOM Elements
// ------------------------------------------------------

const taskInput = document.getElementById("taskInput");       // Task input
const energyTag = document.getElementById("energyTag");       // Energy dropdown
const addTaskBtn = document.getElementById("addTaskBtn");     // Add button
const taskList = document.getElementById("taskList");         // Task list
const progressBar = document.getElementById("progress");      // Progress bar
const privacyToggle = document.getElementById("privacyToggle"); // Incognito toggle



// ------------------------------------------------------
// State Management
// ------------------------------------------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks
let currentFilter = "all";                                   // Filter state
let incognitoMode = false;                                   // Incognito mode



// ------------------------------------------------------
// Event Listeners
// ------------------------------------------------------

// Add task via button
addTaskBtn.addEventListener("click", addTask);

// Add task via ENTER key
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();
        addTask();

    }

});



// ------------------------------------------------------
// Function: Add new task
// ------------------------------------------------------

function addTask() {

    const text = escapeHTML(taskInput.value.trim());
    const energy = energyTag.value;

    // Validation
    if (text === "") {

        alert("Task cannot be empty");
        return;

    }

    if (text.length > 100) {

        alert("Task must be under 100 characters.");
        return;

    }

    const task = {

        id: Date.now(),
        text: text,
        energy: energy,
        completed: false

    };

    tasks.push(task);
    saveTasks();

    // 🔔 Notification
    sendNotification("New task added!");

    taskInput.value = "";
    renderTasks();

}



// ------------------------------------------------------
// Function: Render tasks
// ------------------------------------------------------

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Filters
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



    // Empty State
    if (filteredTasks.length === 0) {

        const li = document.createElement("li");
        li.className = "empty-state";

        li.innerHTML = `
            <span>No tasks yet ✏️</span>
            <small>Add something to get started</small>
        `;

        taskList.appendChild(li);

        updateProgress();
        updateDashboard();
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

    updateProgress();
    updateDashboard();

}



// ------------------------------------------------------
// Function: Toggle task completion
// ------------------------------------------------------

function toggleTask(id, btn) {

    const taskElement = btn.closest("li");

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

        // 🔔 Completion notification
        sendNotification("Task completed!");

        // 🔥 Smart notification (all done)
        const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

        if (allCompleted) {
            sendNotification("All tasks completed 🎉 Great job!");
        }

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
// Function: Save tasks
// ------------------------------------------------------

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// ------------------------------------------------------
// Function: Update progress bar
// ------------------------------------------------------

function updateProgress() {

    const progressText = document.getElementById("progressText");

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressBar.style.width = percent + "%";

    if (progressText) {
        progressText.textContent = percent + "% complete";
    }

    progressBar.style.background = percent === 100 ? "black" : "";

}



// ------------------------------------------------------
// Function: Dashboard analytics
// ------------------------------------------------------

function updateDashboard() {

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const quick = tasks.filter(t => t.energy === "quick").length;
    const deep = tasks.filter(t => t.energy === "deep").length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("quickTasks").textContent = quick;
    document.getElementById("deepTasks").textContent = deep;

    let insight = "Start adding tasks to see insights";

    if (quick > deep) {
        insight = "You focus more on quick tasks. Try deep work.";
    }

    if (deep > quick) {
        insight = "Great! You are focusing on deep work.";
    }

    if (completed === total && total > 0) {
        insight = "Excellent! All tasks completed 🎉";
    }

    document.getElementById("insightText").textContent = insight;

}



// ------------------------------------------------------
// Notifications
// ------------------------------------------------------

function requestNotificationPermission() {

    if ("Notification" in window) {
        Notification.requestPermission();
    }

}

function sendNotification(message) {

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {

        new Notification("Smart Task Dashboard", {
            body: message
        });

    }

}



// ------------------------------------------------------
// Filter Buttons
// ------------------------------------------------------

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.getAttribute("data-filter");
        renderTasks();

    });

});



// ------------------------------------------------------
// Incognito Mode
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
// Initial Load
// ------------------------------------------------------

renderTasks();
updateDashboard();
requestNotificationPermission();