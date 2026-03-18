# task-manager# Task Manager Web App

A minimalistic, responsive **task management single-page application** built using **HTML, CSS, and Vanilla JavaScript**.
The design follows a **notebook-inspired minimal UI**, combining functionality with simplicity while focusing on **clean UX, responsiveness, and security best practices**.

This project was developed as part of a **Software Engineer Intern assignment**, demonstrating the ability to rapidly ship a working product with thoughtful design decisions.

---

# Live Demo

*(Add deployed link after deploying to Vercel / Netlify)*

Example:

https://your-task-manager.vercel.app

---

# Project Overview

This application allows users to manage daily tasks efficiently with a lightweight and responsive interface.

Core capabilities include:

* Creating tasks with effort categorization
* Marking tasks as completed
* Deleting tasks
* Filtering tasks based on status or effort
* Persistent task storage using browser localStorage
* Visual progress tracking
* Privacy-focused task hiding
* Smooth animations and polished UI interactions

The application is implemented as a **single-page frontend application** without external frameworks, emphasizing **clean JavaScript architecture and UI responsiveness**.

---

# Technology Stack

Frontend

* HTML5
* CSS3
* Vanilla JavaScript

Storage

* Browser localStorage

Deployment

* Vercel / Netlify

Design Philosophy

* Minimalistic UI
* Notebook-inspired aesthetic
* Responsive mobile-first layout
* Lightweight and dependency-free

---

# Key Features

## 1. Task CRUD Operations

Users can:

* Add tasks
* Mark tasks as completed
* Delete tasks

Each task contains:

* Task description
* Energy category
* Completion status

Example task object structure:

```javascript
{
  id: 1718238123,
  text: "Finish assignment",
  energy: "deep",
  completed: false
}
```

---

## 2. Effort-Based Task Categorization

Each task can be categorized based on effort level.

Categories include:

* Quick Win
* Deep Work

This allows users to filter tasks based on cognitive effort required.

---

## 3. Task Filtering System

Users can filter tasks dynamically using:

* All
* Active
* Completed
* Quick Win
* Deep Work

Filtering is handled client-side using JavaScript array filtering.

Example logic:

```javascript
tasks.filter(task => !task.completed)
```

This ensures fast UI updates without reloading the page.

---

## 4. Persistent Storage (localStorage)

Tasks are stored using browser localStorage so that user data persists even after refreshing the page.

Example implementation:

```javascript
localStorage.setItem("tasks", JSON.stringify(tasks))
```

When the page loads, tasks are retrieved and rendered automatically.

This ensures:

* No data loss on refresh
* No backend required

---

## 5. Progress Tracking System

The application includes a dynamic progress bar representing the percentage of completed tasks.

Progress is calculated as:

```
completed tasks / total tasks
```

The UI updates automatically whenever tasks are:

* Added
* Completed
* Deleted

This provides visual feedback for productivity tracking.

---

## 6. Notebook-Inspired Minimal UI

The interface design intentionally mimics a **minimal productivity notebook**.

Design elements include:

* Black and white theme
* Crumpled paper background texture
* Cross-hatched sketch-style progress bar
* Dashed list separators

This aesthetic was chosen to create a distraction-free environment focused on task completion.

---

## 7. Responsive Layout

The interface adapts to different screen sizes including:

* Mobile phones
* Tablets
* Laptops
* Desktop monitors

Responsive design is implemented using CSS media queries.

Example:

```css
@media (max-width: 600px)
```

Mobile adjustments include:

* Vertical stacking of input elements
* Wrapped filter buttons
* Task layout adjustments

---

## 8. Burn Animation on Task Completion

When a task is marked as completed, a small animation plays before the task updates.

The animation visually represents a task being “completed” by fading it out.

This improves perceived responsiveness and user engagement.

---

## 9. Incognito Mode (Privacy Feature)

Users can enable **Incognito Mode**, which hides task text by blurring it.

Tasks become visible when hovered.

This feature is useful when working in shared environments.

Example use cases:

* Office environments
* Screen sharing situations
* Privacy while planning tasks

---

## 10. Keyboard Accessibility

Users can add tasks using the **Enter key**, improving usability and accessibility.

This eliminates the need to click the add button manually.

---

## 11. Empty State UX

When no tasks exist, the application displays a friendly message:

```
No tasks yet
Add something to get started
```

This improves the onboarding experience for new users.

---

## 12. Security: XSS Prevention

User input is sanitized before rendering to prevent HTML or script injection.

Example protection:

```javascript
function escapeHTML(text)
```

This ensures malicious input such as:

```
<script>alert(1)</script>
```

will be rendered safely as plain text.

---

# Project Structure

```
task-manager/
│
├── index.html
├── styles.css
├── script.js
│
└── README.md
```

---

# Setup Instructions

1. Clone the repository

```
git clone https://github.com/yourusername/task-manager.git
```

2. Navigate to project folder

```
cd task-manager
```

3. Open index.html in a browser.

No additional dependencies are required.

---

# Design Decisions

Several architectural decisions were made to keep the application efficient and maintainable.

### Why Vanilla JavaScript?

Using plain JavaScript keeps the application lightweight and demonstrates understanding of core browser APIs.

### Why localStorage?

For a small productivity tool, localStorage offers:

* Persistent storage
* No backend requirement
* Instant data retrieval

### Why minimal UI?

A distraction-free interface encourages users to focus on completing tasks rather than navigating complex interfaces.

---

# Future Improvements

Potential improvements include:

* Drag-and-drop task ordering
* Task editing functionality
* Deadline reminders
* Dark mode
* Cloud synchronization
* Offline-first support

---

# Conclusion

This project demonstrates the ability to:

* Build a responsive frontend application
* Implement dynamic UI updates
* Handle state management using localStorage
* Apply UX design principles
* Address basic security considerations

The focus was on **shipping a clean, functional product quickly while maintaining code clarity and usability**.

---
