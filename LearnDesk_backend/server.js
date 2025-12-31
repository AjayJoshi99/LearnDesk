require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require("path");
const connectDB = require('./config/db');

const app = express();
connectDB();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://learndeskindia.netlify.app/' 
}));
// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/class', require('./routes/classRoutes'));
app.use('/api/announcement', require('./routes/announcementRoutes'));
app.use('/api/exam', require('./routes/examRoutes'));
app.use("/api/scheduled-exams", require("./routes/scheduledExamRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use('/api/quotes', require('./routes/quoteRoutes'));
app.use('/api/random-quiz', require('./routes/randomQuizRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
