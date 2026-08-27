# PERN Todo

A full-stack Todo application built using the **PERN stack** — PostgreSQL, Express.js, React, and Node.js.

This project demonstrates how to build a full-stack application where a React frontend communicates with a REST API built with Node.js and Express.js, with PostgreSQL used for persistent data storage.

---

## 🚀 Tech Stack

### Frontend

- React
- JavaScript
- HTML / CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- PostgreSQL

---

## 🏗️ Architecture

The application follows a client-server architecture:

```text
React Client
     │
     │ HTTP Requests
     ▼
Node.js + Express.js
     │
     │ SQL Queries
     ▼
PostgreSQL
```

The React frontend handles the user interface, while the Express.js backend provides the REST API and communicates with the PostgreSQL database.

---

## ✨ Features

- Create new todos
- View todos
- Update todos
- Delete todos
- Persistent todo storage using PostgreSQL
- REST API built with Express.js
- React-based user interface

---

## 📡 REST API

The backend provides API endpoints for managing todos.

| Method   | Endpoint    | Description       |
| -------- | ----------- | ----------------- |
| `GET`    | `/todo/all` | Get all todos     |
| `POST`   | `/todo`     | Create a new todo |
| `PUT`    | `/todo/:id` | Update a todo     |
| `DELETE` | `/todo/:id` | Delete a todo     |

---

## 📂 Project Structure

```text
pern-todo/
├── frontend/
│   ├── src/
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── db/
│   └── ...
│
├── README.md
└── ...
```

The project separates the React frontend from the Node.js/Express backend.

---

## 🛠️ What I Learned

Through this project, I practiced:

- Building REST APIs with Node.js and Express.js
- Creating CRUD operations
- Connecting Express.js to PostgreSQL
- Writing SQL queries
- Storing and retrieving data from PostgreSQL
- Building reusable React components
- Connecting a React frontend to a REST API
- Handling HTTP requests and responses
- Structuring a full-stack application

---

## 🎯 Project Goals

The main goal of this project is to strengthen my understanding of the **PERN stack** by building a complete full-stack application from the database layer to the user interface.

It also helped me practice how the frontend, backend, and database communicate with each other in a real-world application.

---

## 📌 Status

🚧 **In Progress**

This project is part of my ongoing journey toward becoming a **Full-Stack Developer**.
