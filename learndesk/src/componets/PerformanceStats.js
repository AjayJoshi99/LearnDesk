import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Trophy, Clock, Target } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const PerformanceStats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Dummy quiz performance data
    const dummyData = [
      { quiz: "Quiz 1", score: 60, accuracy: 75, avgTime: 12 },
      { quiz: "Quiz 2", score: 75, accuracy: 80, avgTime: 10 },
      { quiz: "Quiz 3", score: 85, accuracy: 88, avgTime: 9 },
      { quiz: "Quiz 4", score: 70, accuracy: 82, avgTime: 11 },
      { quiz: "Quiz 5", score: 90, accuracy: 95, avgTime: 8 },
    ];
    setData(dummyData);
  }, []);

  const categoryPerformance = [
    { name: "Maths", value: 80 },
    { name: "Science", value: 72 },
    { name: "Computers", value: 90 },
    { name: "GK", value: 65 },
  ];

  const overallScore = 80;
  const avgAccuracy = 84;
  const avgTime = 10;

  return (
    <div className="container py-4">
      {/* Overall Performance */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-semibold mb-2 d-flex align-items-center gap-2">
              <Trophy className="text-warning" /> Overall Performance
            </h4>
            <p className="text-secondary mb-1">Average Score: {overallScore}%</p>
            <div className="progress" style={{ width: "250px", height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
          </div>
          <div className="text-end">
            <p className="text-muted mb-0">Accuracy</p>
            <h5>{avgAccuracy}%</h5>
            <p className="text-muted mb-0 mt-2">Avg Time / Q</p>
            <h5>{avgTime}s</h5>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Score Trend */}
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">📈 Score Trend</h5>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data}>
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#0d6efd" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Accuracy Chart */}
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                <Target className="text-success" /> Accuracy (%)
              </h5>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data}>
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="accuracy" fill="#198754" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="col-md-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                <Clock className="text-primary" /> Category Performance
              </h5>
              {categoryPerformance.map((cat, idx) => (
                <div key={idx} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>{cat.name}</span>
                    <span>{cat.value}%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-info"
                      style={{ width: `${cat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;
