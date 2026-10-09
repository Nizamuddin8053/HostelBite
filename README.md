# 🍽️ HostelBite

HostelBite is a full-stack MERN web application designed to simplify hostel food management and student services. It allows students to register, manage their profiles, view meal details, and interact with hostel services efficiently.

---

## 🚀 Live Demo

* 🌐 Frontend: https://hostelbite-project.vercel.app
* ⚙️ Backend: https://hostelbite.onrender.com

---

## 📌 Features

### 👨‍🎓 Student Features

* User Signup & Login (JWT Authentication)
* Account approval before students and staff can sign in
* View Profile Details
* Access Mess information
* Secure API-based data fetching
* QR-based meal attendance with duplicate prevention and attendance history

### 🛠️ Admin / Backend Features

* RESTful API using Express.js
* JWT authentication and role-based authorization for API routes
* Student Data Management
* MongoDB Database Integration

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### DevOps & Deployment

* Vercel (Frontend Hosting)
* Render (Backend Hosting)
* Jenkins (CI/CD Pipeline)

---

## 📁 Project Structure

```
HostelBite/
│
├── frontend/               # React App
│   ├── src/
│   ├── public/
│   └── .env
│
├── backend/               # Express Server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── .env
│
└── Jenkinsfile            # CI/CD Pipeline
```

---

## ⚙️ Environment Variables

### 🔹 Frontend (.env)

```
REACT_APP_API_URL=https://hostelbite.onrender.com
```

### 🔹 Backend (.env)

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create the first administrator account through a trusted deployment/administration process. Public signup is limited to student and staff accounts; administrator accounts must not be created through the public registration form.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Nizamuddin8053/HostelBite.git
cd HostelBite
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
npm start
```

---

### 3️⃣ Setup Frontend

```
npm install
npm start
```

---

## 🔄 CI/CD Pipeline

This project uses **Jenkins** for automated deployment:

* Pulls code from GitHub
* Builds frontend
* Deploys to Vercel
* Backend hosted on Render

---

## 🧪 API Endpoints

### Auth Routes

* `POST /api/auth/signup`
* `POST /api/auth/login`
* `POST /api/auth/send-otp`
* `POST /api/auth/verify-otp`
* `PUT /api/auth/forgot-password`

All endpoints outside `/api/auth` require `Authorization: Bearer <token>`. Student and staff accounts must be approved before login. Resource routes enforce roles; student-specific records are scoped to the authenticated student.
Registration requires a verified email code before the account is created. Password recovery uses a separate, expiring code and a one-time reset token; passwords are never sent by email or returned by the API.

### Attendance

* `POST /api/attendance/qr` — administrator creates a five-minute QR session with a meal type.
* `POST /api/attendance/mark` — an authenticated, approved student records attendance using the QR token.
* `GET /api/attendance/me` — student attendance history.
* `GET /api/attendance` — staff and administrator attendance records.

Students can scan the QR link using their phone camera after signing in. Attendance is derived from the authenticated account, and a unique database constraint prevents duplicate attendance for the same meal on a given UTC date. Expired QR session records are removed automatically by MongoDB's TTL index.

### Other authenticated routes

Students, staff, and administrators can access the relevant features at `/api/students`, `/api/complaints`, `/api/feedbacks`, `/api/menu`, `/api/payments`, `/api/invoice`, `/api/notification`, `/api/salary`, and `/api/expenses`; access is restricted according to role and record ownership.

---

## 📸 Screenshots

<h3>Home Page</h3>


<h3>About Page</h3>



<h3>Service Page</h3>


<h3>Contact Page</h3>



<h3>SignUp Page</h3>



<h3>Login Page</h3>



<h3>Student Panel</h3>



<h3>Admin Panel</h3>



<h3>Staff Panel</h3>



<h3>Send Notification Page</h3>



<h3>Add expense Page</h3>


<h3>Submit complaint page</h3>




---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Nizamuddin Khan**

* MCA Student @ NIT Bhopal
* Full Stack Developer

---

## ⭐ Support

If you like this project, please ⭐ the repository and share it!

---
