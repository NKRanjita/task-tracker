# Task Tracker Web Application

A responsive and feature-rich **task/bug tracker** built with **React.js**. This application supports role-based access for Developers and Managers, time tracking, task approval workflows, and insightful visual analytics — all with a polished, animated UI.

---

## Features

- **Login with Role Selection**: Developer / Manager
- **Developer Features**:
  - Create, Edit, Delete tasks
  - Start/Stop timer for time tracking
  - Submit tasks for approval
- **Manager Features**:
  - View all tasks
  - Approve or Reopen tasks
  - Filter tasks by status, priority, and assignee
- **Time tracking** (updates every 36 seconds)
- **Task trend analytics** with visual charts
- **Animated and color-coded buttons & UI**
- **Persistent storage** using `localStorage`
- **Fully responsive design**

---

## Demo Login Credentials

### Developer
- **Username:** `ranjita`
- **Role:** `Developer`

### Manager
- **Username:** `admin`
- **Role:** `Manager`

> No password is required — this is a mock login for demonstration only.

---

## How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/NKRanjita/task-tracker.git
cd task-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This project uses React, React Router, Chart.js, and simple CSS animations.

### 3. Start the Development Server

```bash
npm start
```

Now open your browser and go to:  
[http://localhost:3000](http://localhost:3000)

---

## Assumptions Made

- No backend/server — all data is stored in localStorage
- Authentication is mock-based (no passwords, no real auth service)
- Timer is simulated and updates automatically (every 36s = 0.01 hour)
- Only Managers can approve or reopen tasks submitted by Developers
- Role and user are selected via dropdown for simplicity

---

## Project Highlights

- Stylish Animated UI: Gradient buttons, hover effects, smooth transitions  
- Chart Integration: Easy-to-read task status breakdown  
- Modular Code: Separated components and routes for easy scaling  
- No Backend Required: Lightweight and fast, works entirely on frontend  
- Mobile-Friendly: Optimized for tablets and smartphones

---

## License

No license is applied.  