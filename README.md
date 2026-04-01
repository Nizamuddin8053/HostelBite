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
* View Profile Details
* Access Mess information
* Secure API-based data fetching

### 🛠️ Admin / Backend Features

* RESTful API using Express.js
* Authentication & Authorization
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

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Nizamuddin8053/hostelbite.git
cd hostelbite
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

### Student Routes

* `GET /api/students`
* `GET /api/students/:id`

---

## 📸 Screenshots

<h3>Home Page</h3>

<img width="900" height="450" alt="home1" src="https://github.com/user-attachments/assets/e1ccdd5d-4ecb-41ef-8f15-f0bede548e74" />

<img width="900" height="450" alt="home2" src="https://github.com/user-attachments/assets/813bac23-d642-45cb-a59a-f96f1206c4b6" />

<img width="900" height="450" alt="home3" src="https://github.com/user-attachments/assets/0f50c329-dcdf-4dfd-bc3a-d0f061b79ef5" />

<h3>About Page</h3>

<img width="900" height="450" alt="about1" src="https://github.com/user-attachments/assets/57d74674-6834-47c3-8514-383373d7aca6" />

<img width="900" height="450" alt="about2" src="https://github.com/user-attachments/assets/4c68f7bc-2aaf-4293-8478-0cc5de10cd1c" />

<img width="900" height="450" alt="about3" src="https://github.com/user-attachments/assets/e3f6dca5-9744-4ac1-885a-a76361026199" />

<h3>Service Page</h3>

<img width="900" height="450" alt="service1" src="https://github.com/user-attachments/assets/1d992176-c5c9-4725-9614-0a0ddbcf4e53" />

<img width="900" height="450" alt="service2" src="https://github.com/user-attachments/assets/f8c835bd-e05b-45cb-a08f-77793c02c7a6" />

<img width="900" height="450" alt="service3" src="https://github.com/user-attachments/assets/31496e47-f7eb-418e-89dd-540e27b3d92b" />

<h3>Contact Page</h3>

<img width="900" height="450" alt="contact1" src="https://github.com/user-attachments/assets/b4e2c925-8938-4fad-b73f-be1d9227c7b5" />

<img width="900" height="450" alt="contact2" src="https://github.com/user-attachments/assets/2a70e5e1-6b6f-4ae6-8361-295e66c706aa" />

<h3>SignUp Page</h3>

<img width="900" height="450" alt="signup" src="https://github.com/user-attachments/assets/dd0f20d4-2fa7-459e-b2c5-42be8fc0f37d" />

<h3>Login Page</h3>

<img width="900" height="450" alt="login" src="https://github.com/user-attachments/assets/1a8eb314-e487-4e3a-9e84-292664ead5a3" />

<h3>Student Panel</h3>

<img width="900" height="450" alt="student panel" src="https://github.com/user-attachments/assets/5bdb526e-0780-48f1-930c-6e4160fadecf" />

<h3>Admin Panel</h3>

<img width="900" height="450" alt="admin panel" src="https://github.com/user-attachments/assets/45cc39b1-b84b-4222-9317-28aedfbe2dd8" />

<h3>Staff Panel</h3>

<img width="900" height="450" alt="staff panel" src="https://github.com/user-attachments/assets/51228401-70cc-4842-a47d-9da4cdae2947" />

<h3>Send Notification Page</h3>

<img width="900" height="450" alt="send notification" src="https://github.com/user-attachments/assets/d632d5cc-aa7e-4f68-b4db-cc7ff9d494fa" />

<h3>Add expense Page</h3>
<img width="503" height="634" alt="add expense" src="https://github.com/user-attachments/assets/d3e6ef64-6bb1-4110-b102-0947a4c1201c" />

<h3>Submit complaint page</h3>

<img width="492" height="425" alt="submit complaint" src="https://github.com/user-attachments/assets/6cb15dd0-1e09-4c37-bee0-5e22000d6cc6" />



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
