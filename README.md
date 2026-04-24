# TEAM VIOLET – Student Team Members Management Application

> **Course:** 21CSS301T – Full Stack Development  
> **Assessment:** CLAT-2 (Online Assessment)  
> **Institution:** SRM Institute of Science and Technology  
> **Year/Sem:** III Year / VI Sem

---

## 📋 Project Description

A full-stack web application to manage student team members. Users can add members with profile photos, view all team members, and explore individual member details. Built with **React.js** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 🗂️ Project Structure

```
TEAM-YELLOW/
├── backend/
│   ├── models/
│   │   └── Member.js          # Mongoose schema
│   ├── routes/
│   │   └── memberRoutes.js    # API routes
│   ├── uploads/               # Uploaded profile images
│   ├── server.js              # Express entry point
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── HomePage.css
│   │   │   ├── AddMemberPage.js
│   │   │   ├── AddMemberPage.css
│   │   │   ├── ViewMembersPage.js
│   │   │   ├── ViewMembersPage.css
│   │   │   ├── MemberDetailsPage.js
│   │   │   └── MemberDetailsPage.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation Steps

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017)
- npm


### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/TEAM-YELLOW.git
cd TEAM-YELLOW
```

### 2. Setup Backend
```bash
cd backend
npm install
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

---


## ▶️ How to Run the App


### Start MongoDB
Make sure MongoDB is running on your machine:
```bash
# On Windows (if installed as service, it auto-runs)
# On Mac/Linux:
mongod
```


### Start Backend (Terminal 1)
```bash
cd backend
npm start
# Server runs at http://localhost:5000
```


### Start Frontend (Terminal 2)
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

---


## 🔌 API Endpoints


| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/members`      | Retrieve all team members |
| GET    | `/api/members/:id`  | Fetch a single member by ID |
| POST   | `/api/members`      | Add a new team member (multipart/form-data) |
| DELETE | `/api/members/:id`  | Delete a member by ID |

### POST /api/members – Request Body (form-data)
| Field | Type | Required |
|-------|------|----------|
| name | string | ✅ |
| roll | string | ✅ |
| year | string | ✅ |
| degree | string | ✅ |
| role | string | ✅ |
| email | string | ✅ |
| project | string | ❌ |
| hobbies | string | ❌ |
| certificate | string | ❌ |
| internship | string | ❌ |
| aboutYourAim | string | ❌ |
| image | file (image) | ❌ |


### Test API in Browser
- All members: [http://localhost:5000/api/members](http://localhost:5000/api/members)
- Single member: [http://localhost:5000/api/members/:id](http://localhost:5000/api/members/:id)

---

## 🖥️ Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with team name and navigation |
| Add Member | `/add` | Form to add a new member with photo upload |
| View Members | `/view` | Grid of all team members |
| Member Details | `/member/:id` | Full profile of a single member |

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router v6, Axios, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **File Upload:** Multer
- **Dev Tools:** VS Code, MongoDB Compass, Nodemon
