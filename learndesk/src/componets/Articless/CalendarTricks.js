import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";


export default function CalendarTricks() {
    const navigate = useNavigate();
  return (
    <div className="calendar-tricks">
        <button
            className="btn btn-outline-primary mb-1"
            onClick={() => navigate("/user/articles")}
        >
            ← Back to Articles
        </button>

      <div className="container my-3">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <header className="text-center text-primary mb-4">
                <div className="container">
                <h1 className="fw-bold display-10">Calendar Tricks for Competitive Exams</h1>
                <p className="lead mb-0 opacity-75">
                    Master the concept of days, dates, and odd days — easily and visually.
                </p>
                </div>
            </header>
            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">📘 Introduction</h3>
              <p className="fs-5">
                A calendar is a system used to organize time into days, weeks, months, and years.
                It is based on astronomical events like the Earth's rotation and revolution.
                In competitive exams, calendar questions often test your ability to calculate
                the day of the week for a given date or the relationship between two dates.
              </p>
              <div className="alert alert-info mt-3 rounded-3">
                <i className="bi bi-lightbulb-fill me-2"></i>
                <strong>Tip:</strong> Remember — calendar questions are built on the concept of <em>odd days</em>.
              </div>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">🧭 Basic Concepts</h3>
              <p><strong>Leap Year:</strong> A year having 366 days. It is divisible by 4, and if it's a century year, it must be divisible by 400 (e.g., 2000 is a leap year, 1900 is not).</p>
              <p><strong>Ordinary Year:</strong> A normal year with 365 days (not a leap year).</p>
              <p><strong>Odd Days:</strong> The number of days left after removing complete weeks. For example, 10 days have 3 odd days since 10 ÷ 7 = 1 week and 3 days remaining.</p>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">📅 Day Codes</h3>
              <p>Each day of the week has an associated code that helps in calculations.</p>
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-primary">
                    <tr><th>Day</th><th>Code</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Sunday</td><td>0</td></tr>
                    <tr><td>Monday</td><td>1</td></tr>
                    <tr><td>Tuesday</td><td>2</td></tr>
                    <tr><td>Wednesday</td><td>3</td></tr>
                    <tr><td>Thursday</td><td>4</td></tr>
                    <tr><td>Friday</td><td>5</td></tr>
                    <tr><td>Saturday</td><td>6</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">📆 Month Codes</h3>
              <p>Month codes are used in calculating the day for a particular date.</p>
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-info">
                    <tr><th>Month</th><th>Non-Leap</th><th>Leap</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>January</td><td>0</td><td>6</td></tr>
                    <tr><td>February</td><td>3</td><td>2</td></tr>
                    <tr><td>March</td><td>3</td><td>3</td></tr>
                    <tr><td>April</td><td>6</td><td>6</td></tr>
                    <tr><td>May</td><td>1</td><td>1</td></tr>
                    <tr><td>June</td><td>4</td><td>4</td></tr>
                    <tr><td>July</td><td>6</td><td>6</td></tr>
                    <tr><td>August</td><td>2</td><td>2</td></tr>
                    <tr><td>September</td><td>5</td><td>5</td></tr>
                    <tr><td>October</td><td>0</td><td>0</td></tr>
                    <tr><td>November</td><td>3</td><td>3</td></tr>
                    <tr><td>December</td><td>5</td><td>5</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">🏛️ Century Codes</h3>
              <p>Century codes help in handling different centuries in date calculations.</p>
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-secondary">
                    <tr><th>Century</th><th>Code</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1600-1699</td><td>6</td></tr>
                    <tr><td>1700-1799</td><td>4</td></tr>
                    <tr><td>1800-1899</td><td>2</td></tr>
                    <tr><td>1900-1999</td><td>0</td></tr>
                    <tr><td>2000 &amp; beyond</td><td>6</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            
            <section className="mb-5">
              <h3 className="fw-bold mb-3 text-primary">Calendar Tricks</h3>
              <h5 className="fw-semibold mt-3">1️. Date-to-Day Trick</h5>
              <p>
                Example: Find the day on <strong>25 May 2003</strong>.
              </p>
              <ol>
                <li>Last two digits of year: <strong>03</strong></li>
                <li>Month code for May: <strong>1</strong></li>
                <li>Date: <strong>25</strong></li>
                <li>Quotient of (03 ÷ 4): <strong>0</strong></li>
                <li>Century code (for 2000s): <strong>6</strong></li>
              </ol>
              <p>Sum = 3 + 1 + 25 + 0 + 6 = 35 → 35 % 7 = 0 → <strong>Sunday</strong>.</p>

              <div className="alert alert-success mt-3 rounded-3">
                <i className="bi bi-check-circle-fill me-2"></i>
                <strong>Result:</strong> 25 May 2003 was a <strong>Sunday</strong>.
              </div>

              <h5 className="fw-semibold mt-4">2️. Day Difference Trick</h5>
              <p>
                If 15 Oct 1923 was a <strong>Monday</strong>, find the day on 17 Nov 1923.
              </p>
              <ul>
                <li>Days remaining in Oct = 16</li>
                <li>Days till 17 Nov = 17</li>
                <li>Total = 33 → 33 % 7 = 5</li>
              </ul>
              <p>Monday (1) + 5 = 6 → <strong>Saturday</strong>.</p>
            </section>

            <section>
              <h4 className="fw-bold text-primary">Conclusion</h4>
              <p>
                Calendar questions test your logic and attention to detail. Learn the codes,
                practice finding odd days, and apply these tricks frequently. With enough practice,
                you'll solve such questions within seconds in any exam.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
