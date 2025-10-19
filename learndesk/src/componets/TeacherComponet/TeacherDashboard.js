import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, BookOpen, ClipboardList, TrendingUp } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherDashboard = () => {
  const [classData, setClassData] = useState([]);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    // Simulated dummy data for classes and quizzes
    setClassData([
      { name: "DBMS", students: 40, avgScore: 82 },
      { name: "CN", students: 38, avgScore: 76 },
      { name: "OS", students: 42, avgScore: 70 },
    ]);

    setQuizData([
      { name: "Demo Quiz", attempts: 25, avgScore: 78, topScore: 95 },
      { name: "DBMS Quiz", attempts: 30, avgScore: 84, topScore: 98 },
    ]);
  }, []);

  const totalClasses = classData.length;
  const totalStudents = classData.reduce((sum, c) => sum + c.students, 0);
  const totalQuizzes = quizData.length;
  const avgPerformance = (
    classData.reduce((sum, c) => sum + c.avgScore, 0) / totalClasses
  ).toFixed(1);

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">👩‍🏫 Teacher Dashboard</h3>

      {/* Summary Section */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <Users className="text-primary mb-2" size={30} />
              <h6>Total Classes</h6>
              <h4>{totalClasses}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <BookOpen className="text-success mb-2" size={30} />
              <h6>Total Quizzes</h6>
              <h4>{totalQuizzes}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <ClipboardList className="text-warning mb-2" size={30} />
              <h6>Total Students</h6>
              <h4>{totalStudents}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <TrendingUp className="text-danger mb-2" size={30} />
              <h6>Avg Performance</h6>
              <h4>{avgPerformance}%</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Average Scores Chart */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">📊 Average Scores by Class</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#0d6efd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row g-4">
        {/* Class Overview */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">🏫 Class Overview</h5>
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Students</th>
                    <th>Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.map((c, idx) => (
                    <tr key={idx}>
                      <td>{c.name}</td>
                      <td>{c.students}</td>
                      <td>{c.avgScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">🧾 Recent Quizzes</h5>
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Attempts</th>
                    <th>Avg Score</th>
                    <th>Top Score</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((q, idx) => (
                    <tr key={idx}>
                      <td>{q.name}</td>
                      <td>{q.attempts}</td>
                      <td>{q.avgScore}%</td>
                      <td>{q.topScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
