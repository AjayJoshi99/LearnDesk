import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, BookOpen, TrendingUp, ClipboardList } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherDashboard = () => {
  const [classData, setClassData] = useState([]);
  const teacherEmail = `${localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : ""}`;
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/results/teacherperformance/${teacherEmail}`
        );
        setClassData(res.data.classPerformance);
      } catch (err) {
        console.error("Error fetching teacher performance:", err);
      }
    };
    fetchPerformance();
  }, [teacherEmail]);

  const totalClasses = classData.length;
  const totalStudents = classData.reduce((sum, c) => sum + c.totalStudents, 0);
  const avgPerformance =
    totalClasses > 0
      ? (classData.reduce((sum, c) => sum + c.avgScore, 0) / totalClasses).toFixed(1)
      : 0;

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">👩‍🏫 Teacher Dashboard</h3>

      {/* Summary */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <Users className="text-primary mb-2" size={30} />
            <h6>Total Classes</h6>
            <h4>{totalClasses}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <ClipboardList className="text-success mb-2" size={30} />
            <h6>Total Students</h6>
            <h4>{totalStudents}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <TrendingUp className="text-danger mb-2" size={30} />
            <h6>Avg Performance</h6>
            <h4>{avgPerformance}%</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <BookOpen className="text-warning mb-2" size={30} />
            <h6>Top Score (Overall)</h6>
            <h4>
              {classData.length > 0
                ? Math.max(...classData.map((c) => c.topScore))
                : 0}
            </h4>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">📊 Average Scores by Class</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classData}>
              <XAxis dataKey="className" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#0d6efd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Overview */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">🏫 Class Overview</h5>
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Students</th>
                <th>Avg Score</th>
                <th>Top Score</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.className}</td>
                  <td>{c.subject}</td>
                  <td>{c.totalStudents}</td>
                  <td>{c.avgScore}%</td>
                  <td>{c.topScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
