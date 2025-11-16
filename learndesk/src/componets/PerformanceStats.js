import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Trophy, Target, ClipboardCheck, Clock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const PerformanceStats = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userEmail = user?.email;
        const classCode = localStorage.getItem("currentClassCode");

        if (!userEmail || !classCode) {
          console.error("User email or class code missing in localStorage");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/results/studentperformance/${userEmail}/${classCode}`
        );

        setSummary(res.data.summary);
      } catch (err) {
        console.error("Error fetching performance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-muted">No quiz performance data found.</h5>
      </div>
    );
  }

  const chartData = summary.performanceList.map((exam, idx) => ({
    quiz: exam.examTitle || `Quiz ${idx + 1}`,
    score: exam.score,
    accuracy: parseFloat(exam.accuracy),
  }));

  return (
    <div className="container py-4">
      {/* Overall Performance Card */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div>
            <h4 className="fw-semibold mb-2 d-flex align-items-center gap-2">
              <Trophy className="text-warning" /> Overall Performance
            </h4>
            <p className="text-secondary mb-1">
              Average Score: {summary?.overallScore}%
            </p>
            <div
              className="progress"
              style={{ width: "250px", height: "10px" }}
            >
              <div
                className="progress-bar bg-primary"
                style={{ width: `${summary?.overallScore}%` }}
              ></div>
            </div>
          </div>

          <div className="text-end mt-3 mt-md-0">
            <p className="text-muted mb-0">Total Quizzes</p>
            <h5>{summary?.totalQuizzes}</h5>
            <p className="text-muted mb-0 mt-2">Attempted</p>
            <h5>{summary?.attemptedQuizzes}</h5>
          </div>
        </div>
      </div>

      {/* Attempted vs Missed Summary */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body row text-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h6 className="text-secondary d-flex justify-content-center align-items-center gap-2">
              <ClipboardCheck className="text-success" /> Attempted
            </h6>
            <h5 className="fw-bold text-success">
              {summary.attemptedQuizzes}
            </h5>
          </div>
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h6 className="text-secondary d-flex justify-content-center align-items-center gap-2">
              <Clock className="text-danger" /> Not Attempted
            </h6>
            <h5 className="fw-bold text-danger">{summary.missedQuizzes}</h5>
          </div>
          <div className="col-12 col-md-4">
            <h6 className="text-secondary d-flex justify-content-center align-items-center gap-2">
              <Target className="text-primary" /> Overall Accuracy
            </h6>
            <h5 className="fw-bold text-primary">{summary.overallScore}%</h5>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4">
        {/* Score Trend Chart */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">📈 Score Trend</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#0d6efd"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Accuracy Chart */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                <Target className="text-success" /> Accuracy (%)
              </h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="accuracy"
                    fill="#198754"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Performance List */}
      <div className="card shadow-sm mt-4 border-0">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">📋 Detailed Quiz Performance</h5>
          {summary.performanceList.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Total Questions</th>
                    <th>Accuracy (%)</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.performanceList.map((exam, idx) => (
                    <tr key={idx}>
                      <td>{exam.examTitle}</td>
                      <td>{exam.score}</td>
                      <td>{exam.totalQuestions}</td>
                      <td>{exam.accuracy}</td>
                      <td>
                        {exam.submittedAt
                          ? new Date(exam.submittedAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center">
              No quiz attempts recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;
