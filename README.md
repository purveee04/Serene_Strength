# 🌿 Serene Strength — README

**Serene Strength** is a **full-stack personal wellness platform** that helps users build sustainable health habits through **goal tracking**, **AI-assisted recommendations**, and a **beautiful, interactive dashboard**.


---

## 🧠 Vision
Make healthy habits **simple, measurable, and delightful** — combining **lightweight UX**, **robust data tracking**, and an **AI assistant** that understands each user’s preferences and progress.

---

## 🗂️ Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack & Tools](#tech-stack--tools)    
4. [Project Structure](#project-structure)  
5. [Setup and installation](#setup-and-installation)  
6. [User Guide](#user-guide)  
7. [Backend Services](#backend-services)  
8. [Frontend Application](#frontend-application)  
9. [License](#license)
10. [Contact & Support](#contact--support)


---

##  Project Overview 
**Serene Strength** empowers users to manage and track their **daily, weekly, and long-term wellness goals** across three main areas:

### 🥗 Nutrition
- Water tracker (with visual progress bar)  
- Macronutrient targets (carbs, proteins, fats, fibers)  
- Meal diary (editable meal entries with checkboxes)  
- Persistent data storage in MongoDB  

### 💪 Training
- Workout minutes tracker with ± time increments  
- Multi-level routines (beginner / intermediate / advanced)  
- Per-routine timers with frontend UI controls  
- Add/remove routines dynamically from daily tasks  

### 🧘 Mindfulness
- Yoga & meditation minutes tracking  
- Genre categorization (strengthening, relaxation, focus, mindfulness)  
- Editable and multi-select routines  

Additional highlights:
- **AI chatbot (Gemini API)** for dynamic goal suggestions and motivation  
- **Weekly goal manager** with custom and preset options  
- **Activity heatmap calendar** for visual performance tracking  
- **Favourites system** for quick access to workouts, foods, and poses  
- **Animated motivational header** and **responsive dashboard**

---

## Features

### 🔐 Authentication & User Management
- Secure **register/login** using **bcrypt** password hashing  
- **JWT-based authentication** — backend issues token, stored in `localStorage`  
- Editable **profile page** with avatar and personal details  

### 📅 Daily Goals & Tracking
- **Water tracking**, **meal diary**, and **macronutrient logging**  
- Real-time progress animation and DB synchronization  

### 💪 Workout & Routines
- Add/subtract workout minutes  
- Multi-select routines across difficulty levels  
- Per-routine timers and “add to favourites” functionality  

### 🧘 Yoga & Meditation
- Minute targets with reset controls  
- Guided/focused genre-based categories  

### 🎯 Weekly Goals
- Editable user goals with preset dropdowns  
- Custom goal creation and progress tracking  
- Motivational messages  

### 📆 Activity Calendar & Heatmap
- Interactive 30-day heatmap (color intensity = minutes or score)  
- Clickable dates for tooltip insights  
- Data fetched from `activity` map (date → minutes)  

### 💖 Favourites
- Manage favourite workouts, meals, and yoga poses  
- Add favourites to dashboard; stored persistently in DB  

### 🤖 AI Assistant (Gemini API)
- Floating AI chat icon expands into a panel  
- User messages are proxied to **Gemini API** via `/api/ai/ask`  
- Assistant returns actionable suggestions like:  
  - “Reduce unnecessary lines in this section”  
  - “Try adding a stretch goal for better engagement”  
  - “Here’s a sample diet for your target calories”
- Confirms before saving goals to user dashboard  

### 🎨 UI & UX
- **Collapsible sidebar** (compact icons expand for labels)  
- **Animated motivational header** with SVG background  
- **Responsive layout** for desktop & mobile  
- **Toasts** for confirmations, warnings, and destructive actions  

---

## Tech Stack & Tools

### 🖥️ Frontend
- **HTML5**, **CSS3** , **Tailwind CSS** (modern, responsive, animated)  
- **Vanilla JavaScript (ES6)**  
- `live-server` *(optional for local hosting)*  

### ⚙️ Backend
- **Node.js (v18+)**  
- **Express.js** for API routing  
- `node-fetch` / `undici` — for Gemini API requests  
- `jsonwebtoken` — for JWT handling  
- `bcryptjs` — for password hashing  
- `cors` — for cross-origin resource sharing  

### 🧾 Database
- **MongoDB Atlas (cloud)**  
- **Mongoose ODM** for schema-based data modeling  

### 🧑‍💻 Development & Deployment
- `nodemon` — for local development  
- **GitHub** — for version control  
- **Render / Railway / Heroku** — for backend deployment  
- **Netlify / Vercel / GitHub Pages** — for frontend hosting  

### 🧪 Tools
- **Postman** — for API testing  
- **Chrome DevTools** — for debugging  
- **Git / GitHub** — for collaboration and versioning  

---
###  Project Structure

```│
├── 📁 backend/
│ ├── 📄 server.js # Entry point of backend server (Express + MongoDB)
│ ├── 📁 config/
│ │ └── db.js # MongoDB connection setup using Mongoose
│ ├── 📁 routes/
│ │ ├── authRoutes.js # Handles user registration, login, and JWT logic
│ │ ├── aiRoutes.js # Gemini AI chatbot route integration
│ │ └── profileRoutes.js # (optional) user profile handling if added later
│ ├── 📁 models/
│ │ └── User.js # User schema storing auth + profile data
│ ├── 📁 middleware/
│ │ └── authMiddleware.js # JWT authentication verification
│ ├── 📄 .env # Environment variables (MongoDB URI, API keys)
│ ├── 📄 package.json # Backend dependencies and scripts
│ ├── 📄 package-lock.json # Locked versions of dependencies
│ └── 📁 node_modules/ # Auto-generated dependencies (ignored in git)
│
├── 📁 frontend/
│ ├── 📄 index.html # Landing page (motivational intro)
│ ├── 📄 login.html # Login interface for users
│ ├── 📄 register.html # User registration form
│ ├── 📄 post-login-temp.html # Redirect page after login
│ ├── 📄 profile.html # User’s dashboard with all goals, cards & tracker
│ ├── 📄 chat.html # Gemini AI-powered chatbot interface
│ ├── 📄 style.css # Global styles and animations
│ ├── 📄 profile-backup2.html # Dashboard and cards styling
│ ├── 📄 profile.css # Chat UI and animations
│ ├── 📄 script.js # Handles UI logic, authentication, and API calls
│ ├── 📄 yourfav.html
│ ├── 📄 login.css
│ │
│ ├── 📁 extra_pages/ # Optional: store less-used or archived HTML/CSS files
│ │ ├── healthy-diet.html
│ │ ├── contact.html
│ │ ├── settings.html
│ │ └── signup.html
│ │ └── motivation.css
│ │ └── diet-post-login.html
│ │ └── privacypolicy.html
│ │ └── motivation.css
│ │ └── termscondition.html
│ │ └── trainer.html
│ │ └── workout-plans.html
│ │ └── workout-post-login.html
│ │ └── yoga-meditation.html
│ │ └── yoga-postlogin.html
│ │
│ └── 📁 assets/ # Optional: images, icons, backgrounds
│ ├── logo.png
│ └── bg.jpg
├──
|
```

## Setup and installation

-**1. Clone the repository**
git clone https://github.com/purveee04/Serene_Strength.git
cd Serene_Strength

-**2. Install dependencies**
 : npm install


-**3. Run local development server**
 : npm run dev

###  User Guide

**Serene Strength** helps you track and improve your wellness:

- **Nutrition:** Log water intake and meals; track macronutrients; edit or delete entries.  
- **Workouts:** Select routines (beginner → advanced), track minutes with timers, mark favourites, and manage daily routines.  
- **Mindfulness:** Track yoga/meditation by genre, combine multiple routines, log minutes completed.  
- **Weekly Goals:** Set goals for workouts, nutrition, or mindfulness; track progress with bars and motivational messages.  
- **Activity Calendar:** View 30-day heatmap of activity; click a date for session details.  
- **AI Assistant:** Tap floating chat icon for tips; confirm suggestions to save to dashboard.  
- **Profile:** Update personal details, view achievements, and monitor overall progress.  

**Tip:** Keep the app online to ensure progress is synced and AI recommendations are accurate.

###  Backend Services

Node.js + Express.js backend with MongoDB (via Mongoose) to store user profiles, wellness data, and chatbot interactions.  
Authentication uses `bcrypt.js` and JWT for secure login sessions.  
API routes: `authRoutes.js` (login/registration), `profileRoutes.js` (user data), `aiRoutes.js` (Gemini AI chatbot).  
Database models: User (credentials, profile, goals); extendable for meditation, nutrition, and progress logs.  
Core services include error handling, input validation, CORS, and `server.js` initializes the server and connects DB.


###  Frontend Application

**Pages:** Home (landing), Login, Register, Post-Login Redirect, Profile Dashboard, Chatbot, Extra Pages (About, Contact, Achievements), etc.  

**Components:** Workout Tracker, Nutrition Tracker, Mindfulness Tracker, Weekly Goals, Activity Heatmap, AI Assistant Panel, Favourites Section, Collapsible Sidebar, Toast Notifications, and more.  

**Contexts:** AuthContext for authentication and JWT token handling.  

**Styling:** Tailwind CSS for responsive design, global styles, and animated UI components; custom CSS for dashboards, cards, and chatbot interface.  

**Scripts:** `script.js` handles UI logic, authentication, API calls, and dynamic dashboard updates.

###  License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

###  Contact & Support

For questions, suggestions, or support, please open an **issue** or contact the maintainers via **GitHub**.

Thank you for being a part of **Serene Strength**!

