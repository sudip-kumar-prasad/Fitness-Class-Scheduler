# 🏋️‍♂️ AI-Powered Online Fitness Class Platform

## 📖 Overview

The **AI-Powered Online Fitness Class Platform** is a full-stack web application built using **React.js**, **Express.js**, **MySQL**, and **Prisma ORM**.
It allows users to sign up, schedule online fitness classes, and experience AI-powered personalized workout sessions — all inside a modern, responsive interface.

Each session runs for **1 hour**, during which the user can view **6–7 curated workouts** and optionally watch **demo videos** to learn the correct form.
At the end, an **AI assistant** analyzes the user’s measurements and recommends the best path to achieving their fitness goals.

---

## 💡 Ideation Document

### 🧩 Problem Statement

Many fitness enthusiasts face difficulties staying consistent and finding structured, guided workouts.
Existing apps either lack **AI personalization** or depend on **third-party platforms** (like Zoom), making fitness tracking fragmented and less engaging.

---

### 💡 Proposed Solution

A **centralized AI-powered online fitness platform** that offers:

* Personalized fitness classes with integrated 1-hour timers.
* Built-in video demonstrations (no external links).
* AI-generated workout plans and progress recommendations.
* User-friendly dashboards to track performance over time.

---

### 🧰 Tech Stack

| Layer              | Technology                                                  | Purpose                                 |
| ------------------ | ----------------------------------------------------------- | --------------------------------------- |
| **Frontend**       | React.js (Vite), TailwindCSS                                | Interactive UI with animations          |
| **Backend**        | Node.js + Express.js                                        | RESTful API and server logic            |
| **Database**       | MySQL                                                       | Structured relational data              |
| **ORM**            | Prisma ORM                                                  | Database modeling and type safety       |
| **Authentication** | JWT + bcrypt                                                | Secure authentication and authorization |
| **AI Integration** | MediaPipe / RapidAPI                                        | Body scan & fitness recommendations     |
| **Analytics**      | Chart.js                                                    | Visual progress tracking                |
| **Deployment**     | Vercel (frontend), Render (backend), PlanetScale (database) | Cloud deployment and scaling            |

---

### 👨‍💻 Team Members and Roles

| Team Member | Role                       | Responsibilities                                       |
| ----------- | -------------------------- | ------------------------------------------------------ |
| **Garv**    | AI Integration             | Class timer system, AI integration, code structuring   |
| **Yash**   | Frontend Developer         | React components, workout UI, video player integration |
| **Harshit** | Backend Developer          | Express routes, authentication, and API endpoints      |
| **Sudip**    | Database & DevOps Engineer | Prisma schema, migrations, and deployment setup        |

---

### 🎯 Expected Outcome

A fully functional, AI-integrated fitness platform that:

* Offers structured online workout classes.
* Helps users maintain discipline and consistency.
* Provides personalized guidance using AI recommendations.
* Tracks progress automatically for long-term improvement.

---

## 🧱 ER Diagram

### 📊 Entity-Relationship Diagram

```
        ┌────────────┐
        │   USER     │
        │------------│
        │ user_id PK │
        │ name        │
        │ email       │
        │ password    │
        │ age         │
        │ gender      │
        │ joined_on   │
        └────┬────────┘
             │ 1
             │
             │ M
      ┌──────▼────────┐
      │   CLASS       │
      │---------------│
      │ class_id PK   │
      │ class_name    │
      │ description   │
      │ duration      │
      │ start_time    │
      │ end_time      │
      └────┬──────────┘
           │ 1
           │
           │ M
     ┌─────▼──────────┐
     │   WORKOUT      │
     │----------------│
     │ workout_id PK  │
     │ class_id FK    │
     │ name           │
     │ reps           │
     │ description    │
     └────┬───────────┘
          │ 1
          │
          │ M
    ┌─────▼────────────┐
    │   VIDEO          │
    │------------------│
    │ video_id PK      │
    │ workout_id FK    │
    │ video_url        │
    │ thumbnail_url    │
    │ duration         │
    └──────────────────┘

    USER ──< CLASS_PROGRESS >── CLASS
```

---

## 🗄️ Database Schema

### 🧍 **User Table**

| Column       | Type                          | Description                |
| ------------ | ----------------------------- | -------------------------- |
| user_id (PK) | INT                           | Unique user ID             |
| name         | VARCHAR(100)                  | Full name                  |
| email        | VARCHAR(100)                  | Unique email               |
| password     | VARCHAR(255)                  | Encrypted password         |
| age          | INT                           | User’s age                 |
| gender       | ENUM('Male','Female','Other') | Gender                     |
| joined_on    | DATETIME                      | Account creation timestamp |

---

### 🧘 **Class Table**

| Column        | Type         | Description               |
| ------------- | ------------ | ------------------------- |
| class_id (PK) | INT          | Unique class ID           |
| class_name    | VARCHAR(100) | e.g., “Full Body Burn”    |
| description   | TEXT         | Overview of class         |
| duration      | INT          | Default 60 minutes        |
| start_time    | DATETIME     | When class begins         |
| end_time      | DATETIME     | Auto set (start + 1 hour) |

---

### 🏋️ **Workout Table**

| Column          | Type         | Description               |
| --------------- | ------------ | ------------------------- |
| workout_id (PK) | INT          | Unique workout ID         |
| class_id (FK)   | INT          | Associated class          |
| name            | VARCHAR(100) | Workout title             |
| reps            | VARCHAR(50)  | e.g., “3 sets of 15 reps” |
| description     | TEXT         | Workout instructions      |

---

### 🎥 **Video Table**

| Column          | Type         | Description         |
| --------------- | ------------ | ------------------- |
| video_id (PK)   | INT          | Unique video ID     |
| workout_id (FK) | INT          | Linked workout      |
| video_url       | VARCHAR(255) | Path to video file  |
| thumbnail_url   | VARCHAR(255) | Video thumbnail     |
| duration        | INT          | Duration in seconds |

---

### 📊 **Class_Progress Table**

| Column           | Type                                          | Description               |
| ---------------- | --------------------------------------------- | ------------------------- |
| progress_id (PK) | INT                                           | Unique progress record    |
| user_id (FK)     | INT                                           | User ID                   |
| class_id (FK)    | INT                                           | Class ID                  |
| start_time       | DATETIME                                      | When user joined class    |
| end_time         | DATETIME                                      | End time (auto +1 hr)     |
| time_remaining   | INT                                           | Remaining time in seconds |
| status           | ENUM('Not Started','In Progress','Completed') | Class state               |

---

## ⏱️ Timer-Based Class Flow

1. When a user joins a class, a **1-hour timer** begins.
2. The user sees **6–7 workouts** assigned to that class.
3. Each workout includes a **tutorial video** (optional to view).
4. Timer counts down in real-time on the frontend.
5. After 60 minutes, the class auto-completes, and progress is saved.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ai-fitness-platform.git
cd ai-fitness-platform
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
```

### 4️⃣ Initialize Prisma and Database

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Access the app at:

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend:** [http://localhost:5000](http://localhost:5000)

---

## 🧹 Design & Code Quality

### ✅ ER Diagram

* Well-labeled entities and relationships shown above.

### ✅ Code Cleanliness

* Organized folder structure:

  ```
  /client     → React frontend  
  /server     → Express backend  
  /prisma     → Schema and migrations  
  ```
* Descriptive variable and function names.
* Modular and reusable React components.
* No unused or commented-out code.

---

## 🏁 Expected Outcome

A robust, modern, and scalable **AI-driven fitness platform** where users can train effectively online, track progress, and receive AI-guided insights to achieve their fitness goals.

---

## 👥 Team Credits

Developed with ❤️ by
**Garv**, **Sudip**, **Harshit**, and **Yash**.
