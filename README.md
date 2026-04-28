# 🛒 E-Commerce Backend API

A full-featured backend system for an e-commerce application built using **Node.js, Express.js, and MongoDB**.  
It includes authentication, product management, cart system, order processing, payment handling, stock management, and email notifications.

---

## 🚀 Features:

- 👤 User Authentication (Register/Login with JWT)
- 🔐 Password encryption (bcrypt)
- 📦 Product Management (CRUD operations)
- 🛒 Cart System (Add / Update / Remove / Clear)
- 📦 Order System (Cart → Checkout → Order creation)
- 💳 Payment Flow (Mock payment system)
- 📊 Order Status Flow (pending → confirmed → shipped → delivered)
- 📧 Email Notifications (Login alert & Payment success)
- 📉 Automatic stock reduction after order

---

## 🛠️ Tech Stack:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Nodemailer (Email service)
- dotenv

---

## 📁 Project Structure:


src/
├── controller/
├── routes/
├── model/
├── middleware/
├── utils/
├── app.js
└── server.js

---

## ⚙️ Installation:

bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
npm install

🔑 Environment Variables:
Create a .env file in root directory:
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password

▶️ Run Project:
npm start

env:
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password

Server will run at:
http://localhost:3000
📡 API Endpoints
👤 User Routes

POST /api/user/register
POST /api/user/login

📦 Product Routes:
POST   /api/product/create
GET    /api/product
GET    /api/product/:id
PUT    /api/product/:id
DELETE /api/product/:id

🛒 Cart Routes:
POST   /api/cart/add
GET    /api/cart
PUT    /api/cart/update/:productId
DELETE /api/cart/remove/:productId
DELETE /api/cart/clear

📦 Order Routes:
POST /api/order/checkout
GET  /api/order
GET  /api/order/:id
PUT  /api/order/:id/status
PUT  /api/order/pay/:id

💳 Payment Flow:
Cart → Checkout → Payment → Order Confirmed

📧 Email Features:
Register alert emial
Login alert email
Payment success email

📌 Future Improvements:
Razorpay / Stripe integration
Admin dashboard frontend
Real-time order tracking
Advanced inventory system

👨‍💻 Author:
Yagna Kaklotar

⭐ Support:
If you like this project, give it a ⭐ on GitHub.
