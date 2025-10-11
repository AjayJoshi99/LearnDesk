import { useNavigate, Link } from "react-router-dom";
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
  ];

  return (
    <div className="articles-container">
      <button className="back-btn" onClick={() => navigate("/user/dashboard")}>
        ← Back to Topics
      </button>

      <h1 className="articles-title">Aptitude Articles</h1>

      <div className="articles-grid">
        {articlesData.map((article) => (
          <Link key={article.id} to={article.path} className="article-card">
            <span className="article-left">
              <span className="article-id">{article.id}</span>
              {article.name}
            </span>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>

      {articlesData.length === 0 && (
        <p className="no-articles">No articles available yet.</p>
      )}
    </div>
  );
};

export default Articles;
