# 🏋️‍♂️ Online Fitness Class Platform

## 📖 Overview

This project is an **Online Fitness Class Platform** where users can join 1-hour fitness sessions online.
Unlike traditional video calls (like Zoom), each class is **self-paced** and provides:

* A **1-hour timer** for the active session.
* **6–7 workouts** displayed on the UI.
* **Demo videos** showing how to perform each workout.
* The ability to **start, pause, and complete** classes seamlessly.

No external meeting links — everything happens within the app.

---

## 🚀 Features

### 👤 User Features

* Register and log in securely.
* View available fitness classes.
* Join a class — the **1-hour timer** starts immediately.
* View **6–7 workouts** for each class.
* Watch **tutorial videos** for each workout.
* Class auto-ends when the timer completes.

### ⚙️ Admin Features

* Add, update, or remove classes.
* Upload or edit workout videos.
* Manage user progress and feedback.

---

## 🧱 Tech Stack

| Layer              | Technology                                 |
| ------------------ | ------------------------------------------ |
| **Frontend**       | React.js / HTML / CSS / JavaScript         |
| **Backend**        | Node.js, Express.js                        |
| **Database**       | PostgreSQL / MySQL / MongoDB (your choice) |
| **ORM**            | Prisma ORM                                 |
| **Authentication** | JWT (JSON Web Token)                       |
| **Storage**        | Cloud / Local storage for video files      |

---

## 🗄️ Database Design

### 🔹 Entity-Relationship Diagram (ER Diagram)

```
        ┌────────────┐
        │   USER     │
        └────┬───────┘
             │ 1
             │
             │ M
      ┌──────▼────────┐
      │   CLASS       │
      └────┬──────────┘
           │ 1
           │
           │ M
     ┌─────▼──────────┐
     │   WORKOUT      │
     └────┬───────────┘
          │ 1
          │
          │ M
    ┌─────▼────────────┐
    │   VIDEO          │
    └──────────────────┘

    USER ──< CLASS_PROGRESS >── CLASS
```

---

## 🧩 Database Schema (Tables)

### 1️⃣ **Users Table**

Stores user information.

| Column       | Type                          | Description          |
| ------------ | ----------------------------- | -------------------- |
| user_id (PK) | INT                           | Unique user ID       |
| name         | VARCHAR(100)                  | Full name            |
| email        | VARCHAR(100)                  | Unique email         |
| password     | VARCHAR(255)                  | Hashed password      |
| age          | INT                           | User age             |
| gender       | ENUM('Male','Female','Other') | Gender               |
| joined_on    | DATETIME                      | Date of registration |

---

### 2️⃣ **Classes Table**

Each fitness class (1 hour per session).

| Column        | Type         | Description             |
| ------------- | ------------ | ----------------------- |
| class_id (PK) | INT          | Unique ID               |
| class_name    | VARCHAR(100) | e.g., “Full Body Burn”  |
| description   | TEXT         | Class overview          |
| duration      | INT          | In minutes (default 60) |
| start_time    | DATETIME     | Start time of class     |
| end_time      | DATETIME     | End time (auto +1 hour) |

---

### 3️⃣ **Workouts Table**

Workouts linked to each class.

| Column          | Type         | Description               |
| --------------- | ------------ | ------------------------- |
| workout_id (PK) | INT          | Unique workout ID         |
| class_id (FK)   | INT          | Linked class              |
| name            | VARCHAR(100) | Workout name              |
| reps            | VARCHAR(50)  | e.g., “3 sets of 15 reps” |
| description     | TEXT         | Workout details           |

---

### 4️⃣ **Videos Table**

Videos explaining workouts.

| Column          | Type         | Description         |
| --------------- | ------------ | ------------------- |
| video_id (PK)   | INT          | Unique video ID     |
| workout_id (FK) | INT          | Linked workout      |
| video_url       | VARCHAR(255) | Video file/link     |    |
| duration        | INT          | Duration in seconds |

---

### 5️⃣ **Class_Progress Table**

Tracks each user’s class status.

| Column           | Type                                          | Description            |
| ---------------- | --------------------------------------------- | ---------------------- |
| progress_id (PK) | INT                                           | Unique progress record |
| user_id (FK)     | INT                                           | Linked user            |
| class_id (FK)    | INT                                           | Linked class           |
| start_time       | DATETIME                                      | When the user started  |
| end_time         | DATETIME                                      | start_time + 1 hour    |
| time_remaining   | INT                                           | Remaining seconds      |
| status           | ENUM('Not Started','In Progress','Completed') | Current state          |

---

## 🕐 Timer Functionality

* When the user **joins a class**, a record is created in `class_progress`.
* Backend stores `start_time` and `end_time`.
* Frontend displays a **countdown timer (60:00)**.
* Timer stops at 0 → class is marked **Completed**.
* If the user leaves midway, `time_remaining` saves progress.

---

## ⚡ API Endpoints (Example)

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/api/register`          | Register a new user      |
| POST   | `/api/login`             | Login with JWT           |
| GET    | `/api/classes`           | Fetch all classes        |
| POST   | `/api/join/:classId`     | Start a class session    |
| GET    | `/api/progress/:userId`  | View progress            |
| GET    | `/api/workouts/:classId` | Get workouts for a class |
| GET    | `/api/videos/:workoutId` | Get videos for a workout |

---

## 🔐 Authentication (JWT)

* JWT is used to protect routes.
* When a user logs in, a **JWT token** is issued.
* Protected routes (like joining class, viewing progress) require a valid token in headers.

---

## 💻 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/online-fitness-platform.git
   ```
2. Navigate to the project

   ```bash
   cd online-fitness-platform
   ```
3. Install dependencies

   ```bash
   npm install
   ```
4. Configure `.env` file

   ```env
   DATABASE_URL="your_database_url_here"
   JWT_SECRET="your_secret_key"
   ```
5. Run the development server

   ```bash
   npm run dev
   ```

---

## 🧠 Future Enhancements

* Add personalized workout recommendations.
* Add streak tracking and daily challenges.
* Introduce subscription plans and payments.
* Enable live chat with fitness trainers.

---


## ✨ Author

Developed by **Garv Sudip Harshit Yash** ❤️
For learning, practice, and portfolio purposes.
