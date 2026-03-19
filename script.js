// ------------------------------------------------------
// Utility: Escape HTML (Prevent XSS)
// ------------------------------------------------------

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}



// ------------------------------------------------------
// DOM Elements
// ------------------------------------------------------

const taskInput = document.getElementById("taskInput");
const energyTag = document.getElementById("energyTag");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progress");
const privacyToggle = document.getElementById("privacyToggle");



// ------------------------------------------------------
// State
// ------------------------------------------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let incognitoMode = false;



// ------------------------------------------------------
// Event Listeners
// ------------------------------------------------------

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});



// ------------------------------------------------------
// Function: Add Task
// ------------------------------------------------------

function addTask() {

    const text = escapeHTML(taskInput.value.trim());
    const energy = energyTag.value;

    if (text === "") {
        showToast("Task cannot be empty ❌");
        return;
    }

    if (text.length > 100) {
        showToast("Max 100 characters allowed ⚠️");
        return;
    }

    const task = {
        id: Date.now(),
        text,
        energy,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    taskInput.value = "";

    renderTasks();

    // Notifications
    sendNotification("New task added!");
    showToast("Task added ✅");
}



// ------------------------------------------------------
// Function: Render Tasks
// ------------------------------------------------------

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    }

    if (currentFilter === "quick") {
        filteredTasks = tasks.filter(t => t.energy === "quick");
    }

    if (currentFilter === "deep") {
        filteredTasks = tasks.filter(t => t.energy === "deep");
    }

    // Empty state
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
// Function: Toggle Task
// ------------------------------------------------------

function toggleTask(id, btn) {

    const li = btn.closest("li");
    li.classList.add("burn");

    setTimeout(() => {

        tasks = tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });

        saveTasks();
        renderTasks();

        showToast("Task completed 🎉");
        sendNotification("Task completed!");

        if (tasks.length > 0 && tasks.every(t => t.completed)) {
            showToast("All tasks completed 🚀");
            sendNotification("All tasks completed 🎉");
        }

    }, 400);
}



// ------------------------------------------------------
// Function: Delete Task
// ------------------------------------------------------

function deleteTask(id) {

    tasks = tasks.filter(t => t.id !== id);

    saveTasks();
    renderTasks();

    showToast("Task deleted 🗑");
}



// ------------------------------------------------------
// Save Tasks
// ------------------------------------------------------

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



// ------------------------------------------------------
// Progress Bar
// ------------------------------------------------------

function updateProgress() {

    const progressText = document.getElementById("progressText");

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressBar.style.width = percent + "%";

    if (progressText) {
        progressText.textContent = percent + "% complete";
    }
}



// ------------------------------------------------------
// Dashboard
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

    let insight = "Start adding tasks";

    if (quick > deep) insight = "Focus more on deep work 🔥";
    if (deep > quick) insight = "Great deep work focus 💪";
    if (completed === total && total > 0) insight = "All tasks done 🎉";

    document.getElementById("insightText").textContent = insight;
}



// ------------------------------------------------------
// Browser Notifications
// ------------------------------------------------------

function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
}

function sendNotification(message) {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
        new Notification("Task Manager", { body: message });
    }
}



// ------------------------------------------------------
// Toast Notifications (IN-APP 🔥)
// ------------------------------------------------------

function showToast(message) {

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}



// ------------------------------------------------------
// Filters
// ------------------------------------------------------

document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});



// ------------------------------------------------------
// Incognito Mode
// ------------------------------------------------------

privacyToggle.addEventListener("click", () => {

    incognitoMode = !incognitoMode;

    taskList.classList.toggle("incognito");

    privacyToggle.innerText = incognitoMode
        ? "Disable Incognito"
        : "Incognito Mode";

});



// ------------------------------------------------------
// Init
// ------------------------------------------------------

renderTasks();
updateDashboard();
requestNotificationPermission();