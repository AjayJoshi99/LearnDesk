import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SimpleCompoundInterest = () => {
  const navigate = useNavigate();

  return (
    <div className="container mb-5">
       <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate("/user/articles")}
      >
        ← Back to Articles
      </button>

      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="text-center text-primary mb-4">
          Simple and Compound Interest (Aptitude Notes)
        </h2>

        <p>
          Simple and Compound Interest are essential topics in the Quantitative Aptitude section of competitive exams. They help in understanding how money grows over time, which is useful for solving financial problems quickly and accurately.
        </p>

        <h4 className="text-success mt-4">Basic Terms</h4>
        <ul>
          <li><strong>Principal (P):</strong> The original amount of money invested or borrowed.</li>
          <li><strong>Rate (R):</strong> The percentage of interest applied per year.</li>
          <li><strong>Time (T):</strong> The duration for which the money is invested or borrowed, usually in years.</li>
          <li><strong>Interest:</strong> The additional amount earned or paid on the principal.</li>
          <li><strong>Amount (A):</strong> The total sum after adding interest, i.e., <strong>A = P + Interest</strong>.</li>
        </ul>

        <h4 className="text-success mt-4">Simple Interest (SI)</h4>
        <p>
          Simple Interest is calculated only on the original principal, regardless of the interest accumulated in previous periods.
        </p>

        <div className="alert alert-info">
          <strong>Formula:</strong> <br />
          <code>SI = (P × R × T) / 100</code> <br />
          <strong>Amount (A) = P + SI</strong>
        </div>

        <h5 className="text-primary mt-4">Example 1:</h5>
        <p>
          Calculate the simple interest on ₹5000 for 3 years at a rate of 10% per annum.
        </p>
        <p>
          <strong>Solution:</strong> <br />
          SI = (5000 × 10 × 3) / 100 = <strong>₹1500</strong> <br />
          Total amount = 5000 + 1500 = <strong>₹6500</strong>
        </p>

        <h4 className="text-success mt-4">Compound Interest (CI)</h4>
        <p>
          Compound Interest is calculated on both the principal and the accumulated interest from previous periods. It allows the money to grow faster than simple interest.
        </p>

        <div className="alert alert-info">
          <strong>Formula (Annual Compounding):</strong> <br />
          <code>A = P × (1 + R/100)<sup>T</sup></code> <br />
          <strong>CI = A − P</strong>
        </div>

        <h5 className="text-primary mt-4">Example 2:</h5>
        <p>
          Find the compound interest on ₹5000 for 2 years at 10% per annum.
        </p>
        <p>
          <strong>Solution:</strong> <br />
          A = 5000 × (1 + 10/100)<sup>2</sup> = 5000 × 1.21 = <strong>₹6050</strong> <br />
          CI = 6050 − 5000 = <strong>₹1050</strong>
        </p>

        <h5 className="text-primary mt-4">Interest Compounded More Frequently</h5>
        <p>
          If interest is compounded more than once a year, such as half-yearly, quarterly, or monthly, the rate and time must be adjusted accordingly:
        </p>

        <div className="alert alert-warning">
          <ul>
            <li>Half-yearly: R = R/2, T = 2 × T</li>
            <li>Quarterly: R = R/4, T = 4 × T</li>
            <li>Monthly: R = R/12, T = 12 × T</li>
          </ul>
        </div>

        <h5 className="text-primary mt-4">Example 3:</h5>
        <p>
          Find the compound interest on ₹8000 for 1 year at 10% per annum, compounded half-yearly.
        </p>
        <p>
          <strong>Solution:</strong> <br />
          Here, R = 10/2 = 5%, T = 2 (half-years) <br />
          A = 8000 × (1 + 5/100)<sup>2</sup> = 8000 × 1.1025 = <strong>₹8820</strong> <br />
          CI = 8820 − 8000 = <strong>₹820</strong>
        </p>

        <h4 className="text-success mt-4">Difference Between Simple and Compound Interest</h4>
        <table className="table table-bordered text-center mt-3">
          <thead className="table-primary">
            <tr>
              <th>Basis</th>
              <th>Simple Interest</th>
              <th>Compound Interest</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calculation</td>
              <td>Based only on the principal</td>
              <td>Based on principal and accumulated interest</td>
            </tr>
            <tr>
              <td>Growth</td>
              <td>Linear</td>
              <td>Exponential</td>
            </tr>
            <tr>
              <td>Formula</td>
              <td>(P × R × T) / 100</td>
              <td>P × (1 + R/100)<sup>T</sup> − P</td>
            </tr>
            <tr>
              <td>Example for 2 years at 10%</td>
              <td>1.2 × P</td>
              <td>1.21 × P</td>
            </tr>
          </tbody>
        </table>

        <div className="alert alert-secondary mt-4">
          <strong>Note:</strong> For short periods or small interest rates, the difference between simple and compound interest is small. However, over longer periods, compound interest increases the amount significantly faster.
        </div>
      </div>
    </div>
  );
};

export default SimpleCompoundInterest;
