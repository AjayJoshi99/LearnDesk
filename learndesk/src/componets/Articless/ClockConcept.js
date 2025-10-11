import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ClockConcept = () => {
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
          🕒 Clocks – Aptitude Notes
        </h2>

        <p>
          A typical analog clock has a circular face with twelve-hour markings
          and 60-minute markings placed around the circumference of the circle,
          called <strong>minute spaces</strong>.
        </p>

        <h4 className="mt-4 text-success">Understanding the Hands of a Clock</h4>
        <ul>
          <li>
            <strong>Hour Hand (Short Hand):</strong> Moves slowly; completes one
            full round every 12 hours.
          </li>
          <li>
            <strong>Minute Hand (Long Hand):</strong> Moves faster; completes
            one full round every hour (60 minutes).
          </li>
        </ul>

        <div className="alert alert-info">
          <strong>Formula:</strong> Angle between hour and minute hands,{" "}
          <code>θ = |30H − (11/2)M|</code>
        </div>

        <h4 className="text-success mt-4">Important Points and Shortcuts</h4>
        <ul>
          <li>In 60 minutes, the minute hand gains 55 minute spaces over the hour hand.</li>
          <li>Minute hand covers 360° in 60 minutes → 6° per minute.</li>
          <li>Hour hand covers 360° in 12 hours → 30° per hour → 0.5° per minute.</li>
          <li>
            The angle between hour and minute hands increases by{" "}
            <strong>5.5° per minute</strong>.
          </li>
          <li>
            Hands coincide once every hour.
            <br />
            <strong>0°</strong> → hands together,{" "}
            <strong>90°</strong> → 15 spaces apart,{" "}
            <strong>180°</strong> → 30 spaces apart.
          </li>
        </ul>

        <div className="alert alert-warning">
          <strong>Clock running fast:</strong> shows time ahead of actual time.
          <br />
          <strong>Clock running slow:</strong> shows time behind actual time.
        </div>

        <h4 className="text-success mt-4">Examples</h4>

        <div className="card p-3 mb-3 border-0 shadow-sm">
          <h5 className="text-primary">Example 1:</h5>
          <p>
            <strong>Question:</strong> At what time between 5 PM and 6 PM would
            the two hands of the clock be together?
          </p>
          <p>
            At 5 PM, the hour hand is at 25 spaces and the minute hand at 0
            spaces. Since the minute hand gains 55 spaces in 60 minutes:
          </p>
          <p>
            Time = (60/55) × 25 = <strong>300/11 minutes ≈ 27.27 minutes</strong>
          </p>
          <p>
            Hence, the hands meet at <strong>5:27 PM</strong>.
          </p>
        </div>

        <div className="card p-3 border-0 shadow-sm">
          <h5 className="text-primary">Example 2:</h5>
          <p>
            <strong>Question:</strong> Find the angle between the hour and
            minute hands at 6:55.
          </p>
          <p>
            Hour hand angle = (30 × 6) + (0.5 × 55) = 207.5°
            <br />
            Minute hand angle = 6 × 55 = 330°
            <br />
            Difference = |207.5 − 330| = <strong>122.5°</strong>
          </p>
          <p>
            Hence, the angle between the hands is{" "}
            <strong>122.5 degrees.</strong>
          </p>
        </div>

        <h4 className="text-success mt-4">Quick Tips</h4>
        <ul>
          <li>
            Use <code>θ = |30H − (11/2)M|</code> for all time-angle problems.
          </li>
          <li>For hands together → θ = 0°</li>
          <li>For hands opposite → θ = 180°</li>
          <li>For right angle → θ = 90°</li>
        </ul>

        <div className="alert alert-secondary mt-4">
          <strong>Practice Tip:</strong> Always convert minutes to fractional
          hours when needed, and double-check if the smaller or larger angle is
          required in the question.
        </div>
      </div>
    </div>
  );
};

export default ClockConcept;
