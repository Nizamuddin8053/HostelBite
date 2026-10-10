# 🍽️ HostelBite — Hostel Mess Management System

A full-stack **MERN application** that simplifies hostel mess management through role-based dashboards for Students, Staff, and Administrators.

🌐 **Live Demo:** [Frontend](https://hostelbite-project.vercel.app) · [Backend API](https://hostelbite.onrender.com)

## 🖥️ Dashboard Preview

### Student Dashboard
![Student Dashboard](screenshots/student/student-dashboard.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin/admin-dashboard.png)

### Staff Dashboard
![Admin Dashboard](screenshots/staff/staff-dashboard.png)


Demo Login Credentials

You can explore the application using the following demo accounts.

Admin Account

    Email: Nizzakhan069@gmail.com
    Password: Abc1234@

    

## ✨ Features at a Glance

| Module | Student | Staff | Admin |
|---|:---:|:---:|:---:|
| Account registration | ✅ | ✅ | — |
| Approval management | — | — | ✅ |
| Weekly menu | View | View | Manage |
| Feedback & attendance | Submit / View own records | View student records | View / Manage |
| Complaints & notifications | Submit / View | View | Manage / Send |
| Payments & invoices | Pay / Track | — | Generate / Track |
| Salary & salary slips | — | View / Download | Manage |
| User management | — | — | Manage |
| Expenses | — | — | Manage |

## 🔄 How HostelBite Works

```mermaid
flowchart TD
    A([Open HostelBite]) --> B{Choose account type}
    B --> C[Student Signup]
    B --> D[Staff Signup]
    C --> E[Admin Reviews Request]
    D --> E
    E --> F{Approved?}
    F -- No --> G[Wait for Approval]
    G --> E
    F -- Yes --> H[Login]
    H --> I{User Role}
    I --> J[Student Dashboard]
    I --> K[Staff Dashboard]
    I --> L[Admin Dashboard]
    style J fill:#dbeafe,stroke:#2563eb,color:#111827
    style K fill:#dcfce7,stroke:#16a34a,color:#111827
    style L fill:#ede9fe,stroke:#7c3aed,color:#111827
```

**Account security:** Students and staff must receive administrator approval before logging in. Administrator accounts are created through a trusted administrative process, not public signup.

## 👨‍🎓 Student Dashboard

```mermaid
flowchart TD
    A([Student Dashboard]) --> B[Complaints & Notifications]
    A --> C[Feedback & Attendance]
    A --> D[Weekly Menu]
    A --> E[Payments & Invoices]
    B --> B1[Submit Complaint]
    B --> B2[View Complaints]
    C --> C1[Submit Feedback]
    C --> C2[View Own Attendance]
    D --> D1[View Weekly Meals]
    E --> E1[Make Payment]
    E --> E2[Track Payment Status]
    E --> E3[View Invoice History]
```

- Register, log in, and view profile details.
- Submit complaints and feedback.
- View the weekly breakfast, lunch, snacks, and dinner menu.
- Scan attendance QR codes and view personal attendance history.
- Make payments and track payment and invoice status.
- Receive notifications from staff and administration.

## 🧑‍🍳 Staff Dashboard

Staff members have **four main sections**:

```mermaid
flowchart TD
    A([Staff Dashboard]) --> B[Salary]
    A --> C[Weekly Menu]
    A --> D[Feedback & Attendance]
    A --> E[Complaints]
    B --> B1[View Salary]
    B --> B2[Download Salary Slip]
    C --> C1[View Weekly Menu]
    D --> D1[View Student Feedback]
    D --> D2[View Student Attendance]
    E --> E1[View Complaints]
    E --> E2[View Notifications]
```

| Section | Functionality |
|---|---|
| 💰 Salary | View salary details and download salary slips. |
| 🍽️ Weekly Menu | View the weekly hostel meal menu. |
| ⭐ Feedback & Attendance | View student feedback and attendance records. |
| 🔔 Complaints | View complaints and notifications. |

## 🛡️ Admin Dashboard

```mermaid
flowchart TD
    A([Admin Dashboard]) --> B[Feedback & Attendance]
    A --> C[Menu & Expenses]
    A --> D[Payments & Invoices]
    A --> E[Staff Salary]
    A --> F[Complaints & Notifications]
    A --> G[User Management]
    B --> B1[View Feedback]
    B --> B2[Manage Attendance]
    C --> C1[Manage Menu]
    C --> C2[Manage Expenses]
    D --> D1[Generate Invoices]
    D --> D2[Track Payments]
    E --> E1[Add Staff]
    E --> E2[Manage Salaries]
    E --> E3[Generate Salary Slips]
    F --> F1[View Complaints]
    F --> F2[Send Notifications]
    G --> G1[Approve Students and Staff]
    G --> G2[Manage Users]
```

- Approve student and staff signup requests.
- Manage student and staff accounts.
- Manage weekly menus, mess expenses, and attendance.
- Review feedback and complaints.
- Generate invoices and track payments.
- Add staff, manage salaries, and generate salary slips.
- Send notifications to users.

## 📱 QR-Based Attendance

```mermaid
sequenceDiagram
    participant A as Administrator
    participant S as Student
    participant API as Express API
    participant DB as MongoDB

    A->>API: Generate meal QR session
    API->>DB: Store expiring session
    API-->>A: Return QR code
    S->>API: Submit QR token with authentication
    API->>DB: Validate session and check duplicate
    alt Valid and not already marked
        API->>DB: Record student attendance
        API-->>S: Attendance marked
    else Invalid, expired, or duplicate
        API-->>S: Reject attendance
    end
```

- QR sessions expire after five minutes.
- Only authenticated, approved students can mark attendance.
- Attendance is associated with the authenticated student.
- A database uniqueness constraint prevents duplicate attendance for the same meal on the same UTC date.
- MongoDB automatically removes expired QR session records using a TTL index.

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph USERS["👥 User Layer"]
        Student["🎓 Student"]
        Staff["🧑‍🍳 Staff"]
        Admin["🛡️ Administrator"]
    end

    subgraph FRONTEND["💻 Frontend Layer — React.js"]
        UI["Role-Based Dashboards"]
        Components["Pages & UI Components"]
        Axios["Axios API Client"]
        UI --- Components
        Components --> Axios
    end

    subgraph BACKEND["⚙️ Backend Layer — Node.js & Express.js"]
        API["REST API Routes"]
        Auth["JWT Authentication"]
        RBAC["Role-Based Authorization"]
        Controllers["Controllers & Business Logic"]
        API --> Auth --> RBAC --> Controllers
    end

    subgraph SERVICES["🔧 Application Services"]
        Attendance["QR Attendance Service"]
        UserManagement["User Approval & Management"]
        Mess["Menu, Feedback & Complaints"]
        Finance["Payments, Invoices & Expenses"]
        Salary["Staff Salary & Salary Slips"]
        Notifications["Notifications & Email OTP"]
    end

    subgraph DATABASE["🗄️ Data Layer"]
        Mongo[("MongoDB Atlas")]
        Models["Mongoose Models"]
    end

    subgraph EXTERNAL["🌐 External Integrations"]
        Razorpay["Razorpay Payment Gateway"]
        Email["Email Service"]
    end

    subgraph DEPLOYMENT["🚀 Deployment & CI/CD"]
        GitHub["GitHub Repository"]
        Jenkins["Jenkins Pipeline"]
        Vercel["Vercel — Frontend Hosting"]
        Render["Render — Backend Hosting"]
    end

    Student & Staff & Admin --> UI
    Axios --> API
    Controllers --> Attendance
    Controllers --> UserManagement
    Controllers --> Mess
    Controllers --> Finance
    Controllers --> Salary
    Controllers --> Notifications

    Attendance --> Models
    UserManagement --> Models
    Mess --> Models
    Finance --> Models
    Salary --> Models
    Notifications --> Models

    Models <--> Mongo
    Finance <--> Razorpay
    Notifications --> Email

    GitHub --> Jenkins
    Jenkins -. Deploys frontend .-> Vercel
    Jenkins -. Backend deployment .-> Render
    Vercel --> Axios
    Render --> API

    classDef users fill:#e0e7ff,stroke:#4f46e5,color:#111827
    classDef frontend fill:#dbeafe,stroke:#2563eb,color:#111827
    classDef backend fill:#dcfce7,stroke:#16a34a,color:#111827
    classDef database fill:#fef3c7,stroke:#d97706,color:#111827
    classDef deployment fill:#f3e8ff,stroke:#9333ea,color:#111827

    class Student,Staff,Admin users
    class UI,Components,Axios frontend
    class API,Auth,RBAC,Controllers,Attendance,UserManagement,Mess,Finance,Salary,Notifications backend
    class Mongo,Models database
    class GitHub,Jenkins,Vercel,Render deployment
```

### Architecture Overview

- **Frontend:** React.js provides separate dashboards for Students, Staff, and Administrators.
- **Backend:** Express.js exposes REST APIs protected by JWT authentication and role-based authorization.
- **Application services:** Handle account approvals, QR attendance, menus, feedback, complaints, payments, invoices, expenses, salaries, and notifications.
- **Database:** MongoDB Atlas stores application data through Mongoose models.
- **Integrations:** Razorpay handles payment processing, while an email service supports OTP and notifications.
- **Deployment:** GitHub and Jenkins support the CI/CD workflow, with Vercel hosting the frontend and Render hosting the backend.
```

**Note:** This diagram represents the architecture described for HostelBite. Adjust any integration or deployment connection if your current Jenkins pipeline handles it differently.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, role-based authorization |
| Payments | Razorpay integration |
| Deployment | Vercel, Render |
| CI/CD | Jenkins |
| Email services | OTP and transactional email integration |

## 📂 Project Structure

```text
HostelBite/
├── public/                 # Frontend public assets
├── src/                    # React application
├── backend/
│   ├── controllers/        # Business logic
│   ├── routes/             # REST API routes
│   ├── models/             # Mongoose models
│   ├── config/             # Database and service config
│   └── .env                # Backend environment variables
├── .env                    # Frontend environment variables
├── Jenkinsfile             # CI/CD pipeline
└── README.md
```

*Adjust the frontend paths above if your repository uses a different directory layout.*

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Nizamuddin8053/HostelBite.git
cd HostelBite
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
```

Add any other service credentials required by your implementation. Never commit real secrets.

Start the backend:

```bash
npm start
```

### 3. Configure the frontend

From the project root, create `.env`:

```env
REACT_APP_API_URL=https://hostelbite.onrender.com
```

Install dependencies and start the frontend:

```bash
npm install
npm start
```

### 4. Administrator setup

Create the first administrator account using a trusted administrative setup process. Do not register administrators through the public signup form or publish administrator passwords in this repository.

## 🔐 Authentication & API

All protected endpoints require:

```http
Authorization: Bearer <token>
```

### Authentication endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | Register a student or staff account |
| POST | `/api/auth/login` | Authenticate an approved user |
| POST | `/api/auth/send-otp` | Send email verification code |
| POST | `/api/auth/verify-otp` | Verify registration code |
| PUT | `/api/auth/forgot-password` | Password recovery |

### Main resource routes

```text
/api/students
/api/complaints
/api/feedbacks
/api/menu
/api/payments
/api/invoice
/api/notification
/api/salary
/api/expenses
/api/attendance
```

Access is restricted by user role and record ownership. Registration requires email verification, and password recovery uses expiring codes and a one-time reset token.

## 🚀 Deployment & CI/CD

```mermaid
flowchart LR
    A[Push Code to GitHub] --> B[Jenkins Pipeline]
    B --> C[Install Dependencies]
    C --> D[Build Frontend]
    D --> E[Deploy Frontend to Vercel]
    B --> F[Backend on Render]
    E --> G([Live HostelBite])
    F --> G
```

- **Frontend:** Vercel
- **Backend:** Render
- **Automation:** Jenkins
- **Database:** MongoDB Atlas

## 📸 Screenshots

Add your screenshots to a `screenshots/` folder and use the following filenames, or update the paths to match your actual files.

| Page | Screenshot |
|---|---|
| Student Dashboard | `screenshots/student/student-dashboard.png` |
| Staff Dashboard | `screenshots/staff/staff-dashboard.png` |
| Admin Dashboard | `screenshots/admin/admin-dashboard.png` |

## 🔮 Future Enhancements

- Mobile application for students and staff.
- Advanced mess inventory and stock tracking.
- Detailed attendance and expense analytics.
- Enhanced reporting and automated alerts.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Nizamuddin Khan**

MCA Student — NIT Bhopal  
Full Stack Developer

- GitHub: [Nizamuddin8053](https://github.com/Nizamuddin8053)

⭐ If you find HostelBite useful, consider starring the repository!
