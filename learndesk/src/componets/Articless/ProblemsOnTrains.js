import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProblemsOnTrains() {
  const navigate = useNavigate();

  return (
    <div className="problems-on-trains">
      <div className="container mt-3">
        <button
          className="btn btn-outline-primary mb-1"
          onClick={() => navigate("/user/articles")}
        >
          ← Back to Articles
        </button>
      </div>

      <div className="container my-2">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-md-4">
            
            <header className="py-2 text-center text-primary">
              <h1 className="fw-bold">
                Problems on Trains - Aptitude Tricks & Formulas
              </h1>
              <p className="lead mb-0 opacity-75">
                A complete guide to solving train-related aptitude problems for
                competitive exams.
              </p>
            </header>

            <section className="mb-5 mt-4">
              <h3 className="fw-bold mb-3 text-primary">Introduction</h3>
              <p className="fs-6">
                In the “Trains” chapter of quantitative aptitude, you will face
                four major types of problems. These revolve around relative
                motion and the distance-speed-time relationship.
              </p>
              <ul className="fs-6">
                <li>Two trains moving in opposite directions.</li>
                <li>Two trains moving in the same direction.</li>
                <li>
                  A train crossing a stationary object like a pole, man,
                  platform, or bridge.
                </li>
                <li>
                  A train crossing or being crossed by another moving object
                  (train/man).
                </li>
              </ul>
              <div className="alert alert-info mt-3 rounded-3">
                <i className="bi bi-lightbulb-fill me-2"></i>
                <strong>Tip:</strong> Always ensure that the correct units are
                used — km/hr ↔ m/s.
              </div>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">
                Key Formulas & Concepts
              </h3>
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-info">
                    <tr>
                      <th>Scenario</th>
                      <th>Formula / Idea</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Train crosses a stationary object</td>
                      <td>Time = Length of train ÷ Speed of train</td>
                    </tr>
                    <tr>
                      <td>
                        Train crosses a stationary object of length <i>L₂</i>
                      </td>
                      <td>Time = (Length of train + L₂) ÷ Speed</td>
                    </tr>
                    <tr>
                      <td>
                        Two trains in opposite directions (lengths P & Q, speeds
                        v₁ & v₂)
                      </td>
                      <td>Time = (P + Q) ÷ (v₁ + v₂)</td>
                    </tr>
                    <tr>
                      <td>
                        Two trains in the same direction (lengths P & Q, speeds
                        v₁ &gt; v₂)
                      </td>
                      <td>Time = (P + Q) ÷ (v₁ - v₂)</td>
                    </tr>
                    <tr>
                      <td>Speed conversion</td>
                      <td>
                        km/hr → m/s = x (5/18), &nbsp; m/s → km/hr = x (18/5)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">
                Question Types with Examples
              </h3>

              <h5 className="fw-semibold mt-4">
                Type 1: Train crossing a stationary object
              </h5>
              <p>
                <strong>Example:</strong> A train of length 250 m runs at 70
                km/hr. What is the time taken to cross a pole?
              </p>
              <p>
                Speed = 70 x (5/18) = 19.44 m/s. <br />
                Distance = 250 m. <br />
                Time = 250 ÷ 19.44 ≈ <strong>12.86 seconds</strong>.
              </p>

              <h5 className="fw-semibold mt-4">
                Type 2: Train crosses a platform or bridge
              </h5>
              <p>
                <strong>Example:</strong> A 150 m long train crosses a 100 m
                platform in 10 seconds. Find its speed.
              </p>
              <p>
                Distance = 150 + 100 = 250 m <br />
                Speed = Distance / Time = 250 ÷ 10 = 25 m/s ={" "}
                <strong>90 km/hr</strong>.
              </p>

              <h5 className="fw-semibold mt-4">
                Type 3: Crossing a moving object in opposite direction
              </h5>
              <p>
                <strong>Example:</strong> A train runs at 62 km/hr and a man
                runs at 8 km/hr in the opposite direction. The train is 200 m
                long. Find the time taken to cross him.
              </p>
              <p>
                Relative Speed = 62 + 8 = 70 km/hr = 19.44 m/s <br />
                Time = 200 ÷ 19.44 ≈ <strong>10.29 seconds</strong>.
              </p>

              <h5 className="fw-semibold mt-4">
                Type 4: Two trains in the same direction
              </h5>
              <p>
                <strong>Example:</strong> Two trains 120 m and 150 m long are
                moving in the same direction at 60 km/hr and 40 km/hr. Find the
                time taken for the faster train to pass the slower.
              </p>
              <p>
                Relative Speed = 60 - 40 = 20 km/hr = 5.56 m/s <br />
                Total Distance = 120 + 150 = 270 m <br />
                Time = 270 ÷ 5.56 ≈ <strong>48.56 seconds</strong>.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">Preparation Tips</h3>
              <ul className="fs-7">
                <li>Always convert units correctly (km/hr ↔ m/s).</li>
                <li>
                  Identify which scenario applies before choosing a formula.
                </li>
                <li>
                  Keep all distances in meters and speeds in m/s for simplicity.
                </li>
                <li>
                  Practice each type of problem until you can spot the formula
                  quickly.
                </li>
                <li>
                  In multiple-choice questions, approximate calculations can help
                  eliminate wrong answers fast.
                </li>
              </ul>
            </section>


            <section>
              <h4 className="fw-bold text-primary">Conclusion</h4>
              <p className="fs-7">
                Train problems may appear complex at first because of the
                multiple cases involved, but once you master the basic formulas
                and relative motion concept, they become one of the easiest
                scoring topics in aptitude. Consistent practice ensures both
                speed and accuracy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
