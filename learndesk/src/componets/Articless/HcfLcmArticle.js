import { useNavigate } from "react-router-dom";

const HcfLcmArticle = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate("/user/articles")}
      >
        ← Back to Articles
      </button>

      <div className="card shadow-lg border-0 p-4 rounded-3">
        <h1 className="text-center text-primary mb-4">HCF & LCM</h1>

        <p>
          The full form of <b>HCF/GCD</b> is Highest Common Factor / Greatest Common Divisor, while <b>LCM</b> stands for Least Common Multiple. HCF is the largest number that divides two or more numbers exactly, whereas LCM is the smallest number divisible by all given numbers.
        </p>


        <h3 className="text-success mt-4">HCF Definition</h3>
        <p>
          HCF or GCD of two numbers is the largest number that can exactly divide both numbers.
        </p>
        <p><b>Example:</b> Find HCF of 6 and 18.</p>
        <ul>
          <li>Divisors of 6 = 1, 2, 3, 6</li>
          <li>Divisors of 18 = 1, 2, 3, 6, 9, 18</li>
          <li><b>HCF = 6</b></li>
        </ul>

        <h3 className="text-success mt-4">LCM Definition</h3>
        <p>
          LCM of two numbers is the smallest number that is a multiple of both numbers.
        </p>
        <p><b>Example:</b> Find LCM of 6 and 18.</p>
        <ul>
          <li>Multiples of 6 = 6, 12, 18, 24, 30,…</li>
          <li>Multiples of 18 = 18, 36, 54,…</li>
          <li><b>LCM = 18</b></li>
        </ul>

        <h3 className="text-success mt-4">HCF & LCM Formula</h3>
        <p>
          For numbers a and b: <br />
          <b>LCM(a, b) × HCF(a, b) = a × b</b>
        </p>

        <h3 className="text-success mt-4">Methods to Find HCF & LCM</h3>
        <h5>1. Division Method</h5>
        <p>Steps for HCF:</p>
        <ol>
          <li>Take smaller number as divisor, larger as dividend.</li>
          <li>Divide and check remainder.</li>
          <li>If remainder ≠ 0, repeat with remainder as new divisor.</li>
          <li>Continue until remainder = 0. Divisor is HCF.</li>
        </ol>
        <p><b>Example:</b> HCF of 36 and 48 = 12</p>

        <p>Steps for LCM:</p>
        <ol>
          <li>Check divisibility by 2, divide accordingly.</li>
          <li>Repeat for 3, 5,… until 1 remains.</li>
          <li>Multiply all divisors used to get LCM.</li>
        </ol>
        <p><b>Example:</b> LCM of 36 and 48 = 144</p>

        <h5 className="mt-4">2. Prime Factorization Method</h5>
        <p>Steps for HCF:</p>
        <ol>
          <li>Find prime factors of numbers.</li>
          <li>Take common factors and multiply them.</li>
        </ol>
        <p><b>Example:</b> HCF of 18 and 90 = 18</p>

        <p>Steps for LCM:</p>
        <ol>
          <li>Find prime factors of numbers.</li>
          <li>Take maximum occurrence of each factor and multiply.</li>
        </ol>
        <p><b>Example:</b> LCM of 18 and 90 = 90</p>

        <h3 className="text-success mt-4">HCF vs LCM</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>HCF</th>
              <th>LCM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Largest number dividing all given numbers</td>
              <td>Smallest number divisible by all given numbers</td>
            </tr>
            <tr>
              <td>Always ≤ any of the numbers</td>
              <td>Always ≥ any of the numbers</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HcfLcmArticle;
