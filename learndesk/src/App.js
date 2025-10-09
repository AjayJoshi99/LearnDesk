import "./App.css";
import { Routes, Route } from "react-router-dom";
import StudentLayout from "./layout/StudentLayout";
import TeacherLayout from "./layout/TeacherLayout";
import Login from './componets/login';
import ForgotPassword from './componets/ForgotPassword';
import { useEffect, useState } from "react";

function App() {
    const [role, setRole] = useState(localStorage.getItem("role"));

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
        
        {role === "user" && (
          <Route path ="/user" element={<StudentLayout />}>
            {/* <Route path="/dashboard" element={<StudentDashboard />} /> */}
          </Route>
        )}

        {role === "teacher" && (
          <Route path="/teacher" element={<TeacherLayout />}>
            
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
