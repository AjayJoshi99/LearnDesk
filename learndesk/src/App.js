import "./App.css";
import { Routes, Route } from "react-router-dom";
import StudentLayout from "./layout/StudentLayout";
import TeacherLayout from "./layout/TeacherLayout";
import Login from './componets/login';
import ForgotPassword from './componets/ForgotPassword';
import Dashboard from './componets/dashboard';
import Exam from './componets/Exam';
import LogicalReasoning from './componets/LogicalReasoning';
import VerbalAbility from './componets/VerbalAbility';
import NonVerbalReasoning from './componets/NonVerbalReasoning';
import ArithmeticAptitude from './componets/ArithmeticAptitude';
import ReviewQuiz from './componets/ReviewQuiz';
import History from "./componets/History";  
import { ArticleRoutes } from "./routes/ArticleRoutes"; 
import { useEffect, useState } from "react";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  console.log("Current role:", role);
  useEffect(() => {
    const handleStorageChange = () => setRole(localStorage.getItem("role"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="LogicalReasoning" element={<LogicalReasoning />} />
          <Route path="VerbalAbility" element={<VerbalAbility />} />
          <Route path="NonVerbalReasoning" element={<NonVerbalReasoning />} />
          <Route path="ArithmeticAptitude" element={<ArithmeticAptitude />} />
          <Route path="Exam/:num" element={<Exam />} />
          <Route path="history" element={<History />} />
          <Route path="history/quiz/:quizNumber" element={<ReviewQuiz />} />
          {ArticleRoutes()}
        </Route>

        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
