import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Articles.css";

const Articles = () => {
  const navigate = useNavigate();

  const articlesData = [
    { id: 1, name: "Number System for Aptitude", path: "/user/articles/numbers" },
    { id: 2, name: "Work, Wages and Time", path: "/user/articles/work-time" },
    { id: 3, name: "Pipes and Cisterns", path: "/user/articles/pipe-cistern" },
    { id: 4, name: "Time Speed Distance", path: "/user/articles/speed-distance-time" },
    { id: 5, name: "HCF / GCD and LCM", path: "/user/articles/hcf-lcm" },
    { id: 6, name: "Percentage", path: "/user/articles/percentage" },
    { id: 7, name: "Ratio and Proportion", path: "/user/articles/ratio-proportion" },
    { id: 8, name: "Age", path: "/user/articles/age-aptitude" },
    { id: 9, name: "Profit and Loss", path: "/user/articles/profit-loss" },
    { id: 10, name: "Clock", path: "/user/articles/clock-concept" },
    { id: 11, name: "Coding - Decoding", path: "/user/articles/coding-decoding" },
    { id: 12, name: "Simple and Compound Interest", path: "/user/articles/simple-compound-interest" },
    { id: 13, name: "Permutations and Combinations", path: "/user/articles/permutations-combinations" },
    { id: 14, name: "Calendar Tricks", path: "/user/articles/calendar-tricks" },
    { id: 15, name: "Problems on Trains", path: "/user/articles/problems-on-trains" },
    { id: 16, name: "Seating Arrangements", path: "/user/articles/seating-arrangements" },
    { id: 17, name: "Arithmetic, Geometric & Harmonic Progressions", path: "/user/articles/math-progressions" },
  ];

  return (
    <div className="articles-container">
      <div className="container py-2">
        <div className="d-flex justify-content-start mb-2">
          <button
            className="back-btn"
            onClick={() => navigate("/user/dashboard")}
          >
            ← Back to Topics
          </button>
        </div>

        <h1 className="articles-title text-center mb-5">
          Aptitude Articles
        </h1>

        {/* Bootstrap responsive grid: 3 per row on lg, 2 on md, 1 on sm */}
        <div className="row g-4 justify-content-center">
          {articlesData.map((article) => (
            <div key={article.id} className="col-12 col-sm-6 col-lg-4">
              <Link to={article.path} className="article-card text-decoration-none">
                <div className="article-left">
                  <span className="article-id">{article.id}</span>
                  <span className="article-name">{article.name}</span>
                </div>
                <span className="arrow">→</span>
              </Link>
            </div>
          ))}
        </div>

        {articlesData.length === 0 && (
          <p className="no-articles mt-5 text-center">
            No articles available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Articles;
