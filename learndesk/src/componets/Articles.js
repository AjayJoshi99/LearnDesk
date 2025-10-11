import { useNavigate, Link } from "react-router-dom";
import "./styles/Articles.css";

const Articles = () => {
  const navigate = useNavigate();

  const articlesData = [
    { id: 1, name: "Number System for Aptitude", path: "/user/articles/numbers" },
    { id: 2, name: "Work, Wages and Time", path: "/user/articles/work-time" },
    { id: 3, name: "Cyclicity of Numbers", path: "/articles/aptitude/cyclicity" },
    { id: 4, name: "Percentage & Ratio Concepts", path: "/articles/aptitude/percentage" },
    { id: 5, name: "Profit, Loss & Discount", path: "/articles/aptitude/profit-loss" },
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
