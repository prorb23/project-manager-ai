# AI-Powered Project & Task Management System

A full-stack project and task management application built with the MERN stack, featuring a Trello-like Kanban board interface, drag-and-drop functionality, and AI-powered task summarization and Q&A using the Google Gemini API.



## ✨ Features

* **Project Management:** Create, view, update, and delete projects.
* **Task Management:** Create, view, update, and delete tasks within projects.
* **Kanban Board Interface:** Visual drag-and-drop board for managing tasks across different statuses (To Do, In Progress, Done).
* **Drag & Drop:** Smoothly move tasks between columns to update their status.
* **AI Summarization:** Get an AI-generated summary of all tasks within a project using Google Gemini.
* **AI Q&A:** Ask specific questions about individual tasks and receive AI-generated answers.
* **Data Persistence:** All project and task data is stored in a MongoDB database.
* **Responsive Design:** Basic responsiveness for usability on different screen sizes.

## 🛠️ Tech Stack

* **Frontend:** React.js (with Vite), JavaScript, CSS
    * `axios` for API calls
    * `react-router-dom` for navigation
    * `@dnd-kit/core` & `@dnd-kit/sortable` for drag-and-drop
* **Backend:** Node.js, Express.js
    * `mongoose` for MongoDB object modeling
    * `@google/generative-ai` for Gemini API integration
    * `cors`, `dotenv`
* **Database:** MongoDB (using MongoDB Atlas)
* **AI:** Google Gemini API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js & npm:** (v18 or later recommended) [https://nodejs.org/](https://nodejs.org/)
* **Git:** [https://git-scm.com/](https://git-scm.com/)
* **MongoDB:** A running MongoDB instance. You can install it locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available). You will need the connection string.
* **Google Gemini API Key:** Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## 🚀 Installation & Setup

Follow these steps to get the project running locally:

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd project-manager-ai
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `backend` directory.
    * Add your MongoDB connection string and Gemini API key to the `.env` file:
        ```env
        MONGO_URI=your_mongodb_connection_string_here
        GEMINI_API_KEY=your_google_gemini_api_key_here
        PORT=5001 # Optional: Define the backend port
        ```
    * **(Make sure to replace the placeholder values with your actual credentials!)**

3.  **Frontend Setup:**
    * Navigate to the frontend directory from the project root:
        ```bash
        cd ../frontend
        # Or just 'cd frontend' if you are already in the root
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * **(No `.env` file needed for the frontend for local development, as it defaults to `http://localhost:5001`)**

## ▶️ Running the Application

You need to run both the backend and frontend servers concurrently.

1.  **Start the Backend Server:**
    * Open a terminal in the `backend` directory.
    * Run the start command:
        ```bash
        npm start
        ```
    * The server should start (usually on port 5001) and connect to MongoDB.

2.  **Start the Frontend Development Server:**
    * Open a **separate** terminal in the `frontend` directory.
    * Run the development command:
        ```bash
        npm run dev
        ```
    * Vite will start the frontend server (usually on port 5173) and provide a local URL.

3.  **Access the Application:**
    * Open your web browser and navigate to the local URL provided by the frontend server (e.g., `http://localhost:5173`).

You should now be able to use the Project Management application!
