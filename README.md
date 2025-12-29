# 📚 LearnDesk  
### Smart Learning & Secure Assessment Platform

LearnDesk is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It provides a unified platform for **learning, practice, and secure online assessments**, designed especially for **placement preparation, aptitude training, and classroom-based evaluations**.

The system allows teachers to conduct controlled assessments while enabling students to practice, learn, and track their progress efficiently.

---

## 🚀 Features

### 👩‍🏫 Teacher Features
- Create and manage virtual classrooms
- Securely add or invite students
- Create and publish custom quizzes
- Share announcements and learning resources
- View student quiz attempts and performance analytics

### 👨‍🎓 Student Features
- Join instructor-created classes
- Attempt class quizzes
- Practice unlimited random quizzes
- Access built-in aptitude categories:
  - Verbal Ability
  - Logical Reasoning
  - Arithmetic Aptitude
  - Quantitative Aptitude
- View instant quiz results and attempt history
- Read learning articles and shared resources

---

## 🧠 Quiz & Assessment System
- Time-based quizzes with countdown timer
- Automatic submission on time expiry
- Instant score calculation
- Random quiz generation for practice
- Previous quiz attempt tracking

---

## 🔐 Secure Exam Environment (Anti-Malpractice)
LearnDesk includes strict measures to maintain exam integrity:

- Full-screen enforced exam mode
- Tab-switch detection with auto submission
- Disabled copy, paste, right-click, and text selection
- Dynamic watermark displaying user email
- Auto submission on:
  - Time expiry
  - Tab switching
  - Forced exit attempts

---

## 🔑 Authentication & Security
- Secure user registration and login
- Email verification
- JWT-based authentication
- Password hashing and encryption
- Role-based access control (Teacher / Student)
- Protected REST APIs

---

## 📩 Additional Features
- Email notifications
- Class announcements
- Quote of the Day for motivation
- File uploads and shared study materials
- Notification-based updates

---

## 🛠 Technology Stack

### Frontend
- React.js
- Bootstrap
- Lucide React Icons

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Security
- JSON Web Tokens (JWT)
- Encrypted passwords and sensitive data

## 📂 Project Structure
---
```text
LearnDesk/
│
├── learndesk/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       ├── App.js
│       └── index.js
│
├── LearnDesk_backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🎯 Use Cases
- Placement preparation
- Online aptitude practice
- Secure internal examinations
- Classroom-based assessments
- Self-paced learning and revision

---

## 🌟 Why LearnDesk?
LearnDesk brings together:
- Secure assessment mechanisms
- Structured learning resources
- Student engagement tools
- Teacher control and performance tracking

All within a scalable **MERN-based architecture**.

---

## 🚧 Future Enhancements
- Advanced analytics dashboard for teachers
- AI-based question generation
- Adaptive difficulty quizzes
- Mobile application support
- Certificate generation

---
🌐 **Live Application:**  
[Click here](https://learndeskindia.netlify.app/)
---
## ⚙️ Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AjayJoshi99/LearnDesk.git
cd LearnDesk
```

### 2. Install Dependencies

#### Frontend
```bash
cd learndesk
npm install
```

#### Backend
```bash
cd ../LearnDesk_backend
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `LearnDesk_backend` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4. Run the Application

#### Start Backend Server
```bash
cd LearnDesk_backend
node server.js
```

#### Start Frontend Server
```bash
cd learndesk
npm start
```

### 5. Access the Application
- Frontend: http://localhost:3000  
- Backend: http://localhost:5000

---
## 🧑‍💻 Author
**Ajay Joshi**  
Software Developer  
Project: **LearnDesk**

---

## 📬 Contact
- 📧 Email: ajayjoshi1908@gmail.com  
- 💼 LinkedIn: https://www.linkedin.com/in/ajay-joshi-99b752252/  
- 🌐 GitHub: https://github.com/AjayJoshi99

Feel free to connect for collaboration, feedback, or opportunities.

