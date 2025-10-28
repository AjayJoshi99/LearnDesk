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
import { Trophy, Target } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const PerformanceStats = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [classComparison, setClassComparison] = useState(null);
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

        // 1️⃣ Fetch user performance
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/results/userperfomrance/${userEmail}/${classCode}`
        );

        setData(res.data.performanceData);
        setSummary(res.data.summary);

        // 2️⃣ Fetch all class results for comparison
        const classRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/results/classperfomance/${classCode}`
        );

        const classResults = classRes.data;
        if (classResults && classResults.length > 0) {
          const classAverages = classResults.map(
            (r) => (r.score / r.totalQuestions) * 100
          );

          const classAvg =
            classAverages.reduce((a, b) => a + b, 0) / classAverages.length;

          const topper = Math.max(...classAverages);

          const myScore = summary?.overallScore || 0;

          const betterThan =
            (classAverages.filter((s) => s < myScore).length /
              classAverages.length) *
            100;

          setClassComparison({
            classAvg: classAvg.toFixed(1),
            topper: topper.toFixed(1),
            betterThan: betterThan.toFixed(1),
          });
        }
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

  return (
    <div className="container py-4">
      {/* Overall Performance */}
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
            <p className="text-muted mb-0">Accuracy</p>
            <h5>{summary?.avgAccuracy}%</h5>
            <p className="text-muted mb-0 mt-2">Avg Time / Q</p>
            <h5>{summary?.avgTime}s</h5>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      {classComparison && (
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-body row text-center">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <h6 className="text-secondary">Class Average</h6>
              <h5 className="fw-bold text-primary">
                {classComparison.classAvg}%
              </h5>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <h6 className="text-secondary">Topper’s Score</h6>
              <h5 className="fw-bold text-success">
                {classComparison.topper}%
              </h5>
            </div>
            <div className="col-12 col-md-4">
              <h6 className="text-secondary">You performed better than</h6>
              <h5 className="fw-bold text-warning">
                {classComparison.betterThan}% of class
              </h5>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="row g-4">
        {/* Score Trend */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">📈 Score Trend</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
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
                <BarChart data={data}>
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
    </div>
  );
};

export default PerformanceStats;
