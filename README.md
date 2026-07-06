# 🎯 CareerMind – AI Virtual Interview Platform

CareerMind is a full-stack AI-powered virtual interview platform that helps users prepare for technical and behavioral interviews through realistic AI-generated interview sessions.

Built with the MERN stack, CareerMind leverages OpenRouter AI to generate personalized interview questions, Firebase Authentication for secure user login, Redux for state management, and Razorpay for seamless credit purchases.

The platform enables users to practice interviews, improve confidence, and prepare effectively for real-world job opportunities.

---

## 🚀 Live Demo

🌐 Frontend: https://career-mind-lake.vercel.app

🔗 Backend API: https://careermind-sata.onrender.com

---

## ✨ Features

* 🔐 Firebase Authentication (Google Sign-In)
* 🤖 AI-Powered Interview Question Generation
* 🎯 Personalized Interviews Based on Job Role & Skills
* 🧠 Technical & Behavioral Interview Questions
* 📚 Interview Session Storage & History
* 💳 Razorpay Payment Integration
* 💰 Credit-Based Interview System
* 📊 User Dashboard
* ⚡ Fast & Responsive User Interface
* 🔄 Dynamic AI Question Generation with OpenRouter
* 🛡️ Secure REST APIs & Authentication
* 🌍 Cloud Deployment with Vercel & Render

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* React Redux
* Axios
* React Router DOM
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Third-Party Services

* OpenRouter AI
* Firebase Authentication
* Razorpay
* MongoDB Atlas

---

## 📂 Project Structure

### Frontend

```bash
client/
├── public/
├── src/
│   ├── components/
│   ├── config/
│   ├── constants[/
│   ├── pages/
│   ├── redux/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

### Backend

```bash
server/
├── config/
├── controllers/
├── middlewares/
├── models/
├── public/
├── routes/
├── services/
├── .env
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/razakhnn14/CareerMind.git

cd CareerMind
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

---

## ▶️ Running Locally

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Application will run at:

```text
Frontend: http://localhost:5173
Backend : http://localhost:5000
```

---

## 🤖 AI Interview Workflow

1. User signs in using Firebase Authentication.
2. User selects:

   * Job Role
   * Experience Level
   * Skills/Tech Stack
3. Credits are validated.
4. Request is sent to OpenRouter AI.
5. AI generates personalized interview questions.
6. Questions are displayed in an interactive interview session.
7. Interview sessions are stored in MongoDB.
8. Users can revisit previous interview sessions from their dashboard.

---

## 💳 Payment Workflow

1. User selects a credit package.
2. Backend creates a Razorpay order.
3. User completes payment securely.
4. Razorpay payment signature is verified.
5. Credits are added to the user's account.
6. Credits are deducted whenever a new AI interview session is generated.

---

## 🧠 OpenRouter AI Workflow

CareerMind leverages OpenRouter AI to:

* Generate technical interview questions
* Generate behavioral interview questions
* Create role-specific interview scenarios
* Generate questions based on user skills
* Simulate realistic interview experiences
* Deliver dynamic AI-powered interview content in real time

---

## 🔒 Security Features

* Firebase Authentication
* JWT-Based Authorization
* Protected API Routes
* Secure Environment Variables
* Razorpay Signature Verification
* MongoDB Data Validation
* CORS Protection
* Secure Credit Management System

---

## 🚀 Deployment

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

---

## 👨‍💻 Author

### Raza Khan

GitHub: https://github.com/razakhnn14

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

Contributions, suggestions, and feedback are always welcome.
