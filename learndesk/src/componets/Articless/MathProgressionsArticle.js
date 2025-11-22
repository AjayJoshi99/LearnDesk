import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MathProgressionsArticle = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ lineHeight: "1.8" }}>
      <button
        className="btn btn-outline-primary mb-4"
        onClick={() => navigate("/user/articles")}
      >
        ← Back to Articles
      </button>

      <div className="card shadow-lg border-0 p-4 rounded-3">
        <h1 className="text-center text-primary mb-4">
          Arithmetic, Geometric & Harmonic Progressions - Tips, Tricks & Formulas
        </h1>

        <p>
          Progressions (AP, GP, and HP) form an important part of competitive exams. 
          Understanding their formulas, patterns, and shortcuts helps solve questions faster 
          and more accurately. Here is a complete guide with powerful tips and tricks.
        </p>

        <h2 className="text-success mt-4">Tips and Tricks for AP (Arithmetic Progression)</h2>

        <ul>
          <li>
            <b>Definition:</b> A sequence in which the difference between consecutive terms is constant.
          </li>
          <li>
            <b>Common difference (d):</b> d = a₂ - a₁
          </li>
          <li>
            <b>nth Term:</b> tₙ = a + (n - 1)d
          </li>
          <li>
            <b>Number of Terms:</b> n = ((l - a) / d) + 1
          </li>
          <li>
            <b>Sum of n Terms (Sₙ):</b>  
            <br />Sₙ = n/2 * [2a + (n - 1)d]  
            <br />OR  
            <br />Sₙ = n/2 * (a + l)
          </li>
          <li>
            While solving three unknown terms in an AP whose sum or product is given, assume them as:
            <b> a - d, a, a + d </b>
          </li>
          <li>
            For four unknown terms in AP whose sum or product is given, assume:
            <b> a - 3d, a - d, a + d, a + 3d </b>
          </li>
          <li>
            If the problem says numbers are in AP, convert conditions into equations using the nth term formula.
          </li>
        </ul>

        <h2 className="text-success mt-4">Tips and Tricks for GP (Geometric Progression)</h2>

        <ul>
          <li>
            <b>Definition:</b> A sequence in which every term after the first is multiplied by a constant ratio.
          </li>
          <li>
            <b>Common Ratio (r):</b> r = a₂ / a₁
          </li>
          <li>
            <b>nth Term:</b> aₙ = a * r<sup>n-1</sup>
          </li>
          <li>
            <b>Sum of first n terms (Sₙ) when r &gt; 1:</b>  
            Sₙ = a * (rⁿ - 1) / (r - 1)
          </li>
          <li>
            <b>Sum of first n terms (Sₙ) when r &lt; 1:</b>  
            Sₙ = a * (1 - rⁿ) / (1 - r)
          </li>
          <li>
            <b>Infinite GP Sum (|r| &lt; 1):</b>  
            S∞ = a / (1 - r)
          </li>
          <li>
            While solving three unknown terms in a GP whose sum or product is given, assume:
            <b> a/r, a, a·r </b>
          </li>
          <li>
            If ratio is not obvious, divide terms to identify r.
          </li>
        </ul>
        <h2 className="text-success mt-4">Tips and Tricks for HP (Harmonic Progression)</h2>

        <ul>
          <li>
            <b>Definition:</b> A sequence is an HP if its reciprocals form an AP.
          </li>
          <li>
            <b>nth Term of HP:</b>  
            tₙ = 1 / (a + (n - 1)d)
          </li>
          <li>
            <b>Harmonic Mean (HM) of a and b:</b>  
            HM = 2ab / (a + b)
          </li>
          <li>
            To solve HP problems, always convert them into AP using reciprocals.
          </li>
          <li>
            Use AP formulas after conversion, then take reciprocals again if needed.
          </li>
        </ul>

        <div className="alert alert-info mt-4">
          <strong>Pro Tip:</strong>  
          Always remember the patterns:  
          <br />AP → constant difference  
          <br />GP → constant ratio  
          <br />HP → reciprocal of AP  
        </div>

        <div className="alert alert-warning mt-3">
          <strong>Exam Tip:</strong>  
          When terms are unknown, assume them symmetrically (a-d, a, a+d) for AP and (a/r, a, ar) for GP. 
          This reduces equations and saves time in competitive exams.
        </div>

        <p className="mt-4 text-muted">
          With regular practice of formulas and shortcut patterns, you can easily solve 
          AP, GP, and HP questions quickly and accurately.
        </p>
      </div>
    </div>
  );
};

export default MathProgressionsArticle;
