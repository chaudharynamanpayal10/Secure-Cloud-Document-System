# ☁️ CloudVault AI

A Secure Cloud Document Management System built using **Node.js, Express.js, MongoDB Atlas, AWS EC2, AWS S3, PM2, and Nginx**.

---

## 📌 Project Overview

CloudVault AI is a secure cloud-based document management system that allows users to:

- 🔐 Create an account and log in securely
- 📂 Upload documents to AWS S3
- 📄 View uploaded files
- ⬇️ Download files
- 🗑️ Delete files
- 📊 Track storage usage
- ☁️ Access files from anywhere

---

## 🚀 Live Demo

**Frontend**

```
http://13.233.157.89
```

---

## 💻 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Cloud Services
- AWS EC2
- AWS S3

### Deployment
- PM2
- Nginx
- GitHub

---

## ✨ Features

- User Authentication (Signup/Login)
- JWT Authentication
- Secure Password Hashing
- File Upload
- File Download
- File Delete
- Dashboard
- Storage Usage
- Cloud Storage using AWS S3
- Responsive UI
- Secure API

---

## 📁 Project Structure

```
Secure-Cloud-Document-System
│
├── frontend
│   ├── css
│   ├── js
│   ├── images
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── files.html
│   └── upload.html
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/chaudharynamanpayal10/Secure-Cloud-Document-System.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

Open

```
index.html
```

or deploy using Nginx.

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5001

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY

AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY

AWS_REGION=ap-south-1

AWS_BUCKET_NAME=YOUR_BUCKET_NAME
```

## 👨‍💻 Author

**Naman Payal**

GitHub

https://github.com/chaudharynamanpayal10

LinkedIn

https://www.linkedin.com/in/naman-payal-786203344/

---

## 📄 License

This project is developed for educational and learning purposes.
