# 📓 Minimal Task Manager

*A responsive notebook-style productivity app*

---

## Overview

This project is a **minimalistic task management web application** designed to help users organize tasks with a clean and distraction-free interface.

The application focuses on **simplicity, responsiveness, and usability** while demonstrating core frontend engineering practices such as:

* Dynamic UI rendering
* Client-side state management
* Data persistence
* Input validation and security handling
* Responsive design
* Interactive UX enhancements

The interface follows a **minimal notebook aesthetic**, emphasizing clarity and usability over complex visual design.

---

# Live Demo

https://pavan755.github.io/task-manager/

---

# Key Features

## Task Management

Users can easily manage tasks with basic CRUD operations.

✔ Add tasks
✔ Mark tasks as completed
✔ Delete tasks

Each task includes:

* Task description
* Effort category
* Completion state

Example task structure:

```javascript
{
  id: 1718238123,
  text: "Finish assignment",
  energy: "deep",
  completed: false
}
```

---

## Effort-Based Task Categorization

Tasks can be categorized based on **effort level**.

Categories available:

* Quick Win
* Deep Work

This allows users to prioritize tasks based on available time and cognitive effort.

---

## Dynamic Filtering System

Users can filter tasks using multiple views.

Available filters:

* All Tasks
* Active Tasks
* Completed Tasks
* Quick Win Tasks
* Deep Work Tasks

Filtering is handled entirely on the client side using JavaScript array operations.

---

# Application Workflow

The application follows a simple data flow structure.

```
User Input
     ↓
Input Validation
     ↓
Task Object Creation
     ↓
Update Task Array
     ↓
Save to localStorage
     ↓
Render Updated UI
     ↓
Update Progress Indicator
```

This workflow ensures that the UI always reflects the latest state of the task list.

---

# UI Interaction Workflow

### Adding a Task

```
User types task
        ↓
Press Enter / Click Add
        ↓
Task validated
        ↓
Task added to list
        ↓
Task saved to localStorage
        ↓
UI re-renders with updated task list
```

---

### Completing a Task

```
User clicks ✔
       ↓
Burn animation plays
       ↓
Task completion status toggled
       ↓
Data saved to localStorage
       ↓
Progress bar updated
```

---

### Deleting a Task

```
User clicks delete icon
       ↓
Task removed from array
       ↓
localStorage updated
       ↓
UI re-renders
```

---

# Data Persistence

Tasks persist across browser sessions using **localStorage**.

### Save Tasks

```
localStorage.setItem("tasks", JSON.stringify(tasks))
```

### Load Tasks

```
JSON.parse(localStorage.getItem("tasks"))
```

This ensures that tasks remain available even after page refresh or browser restart.

---

# Progress Tracking

The application includes a **dynamic progress indicator** that tracks completed tasks.

Progress formula:

```
Progress = (Completed Tasks / Total Tasks) × 100
```

The progress bar updates automatically whenever:

* A task is added
* A task is completed
* A task is deleted

---

# Privacy Feature – Incognito Mode

Incognito Mode allows users to hide task text when working in public environments.

When enabled:

* Task descriptions are blurred
* Hovering over a task temporarily reveals the text

This feature provides quick privacy for sensitive task lists.

---

# Security Considerations

To prevent malicious input, user-entered text is sanitized before rendering.

Example protection method:

```javascript
function escapeHTML(text)
```

This prevents script injection such as:

```
<script>alert("xss")</script>
```

from executing inside the application.

---

# User Experience Enhancements

Several UX improvements were implemented to create a smoother user experience.

### Keyboard Accessibility

Users can add tasks using the **Enter key**, eliminating the need to click the Add button.

---

### Empty State Handling

If no tasks exist, the interface displays a helpful message:

```
No tasks yet
Add something to get started
```

This improves usability for first-time users.

---

### Hover Interactions

Tasks respond to hover interactions with subtle visual feedback to improve interactivity.

---

# Design Philosophy

The application design is intentionally minimal.

Design choices include:

* Black and white notebook theme
* Subtle paper texture background
* Sketch-style progress bar
* Clean typography using monospace font

This aesthetic creates a **focused and distraction-free task management experience**.

---

# Responsive Design

The layout adapts to different screen sizes.

Supported devices:

* Mobile phones
* Tablets
* Laptops
* Desktop monitors

Responsive behavior includes:

* Stacked input controls on mobile
* Flexible task layout
* Wrapped filter buttons

Media queries ensure usability across all device types.

---

# Project Structure

```
task-manager/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

# Technology Stack

Frontend

* HTML5
* CSS3
* Vanilla JavaScript

Storage

* Browser localStorage

Deployment

* GitHub Pages

---

# Setup Instructions

1. Clone the repository

```
git clone https://github.com/yourusername/task-manager.git
```

2. Navigate to the project directory

```
cd task-manager
```

3. Open the project

Simply open `index.html` in your browser.

No external dependencies are required.

---

# Future Improvements

Potential enhancements include:

* Task editing capability
* Drag-and-drop task reordering
* Deadline reminders
* Cloud data synchronization
* Dark mode
* Offline-first support

---

# Conclusion

This project demonstrates the ability to:

* Design and ship a functional web application
* Implement responsive UI design
* Manage application state using localStorage
* Apply UX best practices
* Address basic frontend security concerns

The focus was on building a **clean, responsive, and maintainable task management application** with thoughtful user experience design.

---
