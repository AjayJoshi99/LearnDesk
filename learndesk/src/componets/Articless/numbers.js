import { useNavigate } from "react-router-dom";

const NumbersArticle = () => {
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
          Numbers and Their Types
        </h1>

        <p>
          Numbers are the fundamental units of mathematics. In this article, we
          will discuss numbers, their types, important facts, divisibility
          rules, and other important points about numbers for aptitude
          preparation.
        </p>

        <h2 className="text-success mt-4">Types of Numbers</h2>
        <ul>
          <li>
            <b>Integers:</b> All numbers whose fractional part is 0, like -3,
            -2, 1, 0, 10, 100.
          </li>
          <li>
            <b>Natural Numbers:</b> Counting numbers like 1, 2, 3, 4, 5, 6 ...
          </li>
          <li>
            <b>Whole Numbers:</b> All natural numbers and 0.
          </li>
          <li>
            <b>Prime Numbers:</b> Numbers having only two distinct factors — 1
            and itself (e.g., 2, 3, 53, 67, 191).
          </li>
          <li>
            <b>Composite Numbers:</b> Numbers greater than 1 that are not prime
            (e.g., 4, 60, 91, 100).
          </li>
        </ul>

        <h3 className="text-success mt-4">Important Points on Prime Numbers</h3>
        <ul>
          <li>0 and 1 are neither prime nor composite.</li>
          <li>2 is the only even prime number.</li>
          <li>
            There are 25 prime numbers less than 100:
            <br />
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
            67, 71, 73, 79, 83, 89, 97.
          </li>
          <li>
            To check if a number p is prime, find n such that n² ≥ p, and check
            divisibility by primes ≤ n.
          </li>
          <li>
            <b>Co-primes:</b> Two numbers a and b are co-prime if their HCF is 1.
          </li>
          <li>
            <b>Count of divisors:</b> If n = p₁ᵉ¹ × p₂ᵉ² × ... × pₖᵉᵏ, then the
            number of divisors = (e₁ + 1)(e₂ + 1)...(eₖ + 1).  
            <br />Example: 200 = 2³ × 5² → divisors = (3 + 1)(2 + 1) = 12.
          </li>
        </ul>

        <h3 className="text-success mt-4">Divisibility Rules</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Divisible By</th>
                <th>Rule</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2</td>
                <td>Last digit is even.</td>
                <td>124 → last digit 4 → divisible by 2.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sum of digits divisible by 3.</td>
                <td>12321 → sum=9 → divisible by 3.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Last two digits divisible by 4.</td>
                <td>1232 → 32 divisible by 4.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Last digit is 0 or 5.</td>
                <td>85 → last digit 5 → divisible by 5.</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Divisible by both 2 and 3.</td>
                <td>114 → divisible by 2 & 3.</td>
              </tr>
              <tr>
                <td>7</td>
                <td>
                  Double the last digit, subtract from rest; if result divisible
                  by 7 → number divisible by 7.
                </td>
                <td>
                  196 → 19 - (2×6)=7 → divisible by 7.
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>Last three digits divisible by 8.</td>
                <td>1232 → 232 divisible by 8.</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Sum of digits divisible by 9.</td>
                <td>12321 → sum=9 → divisible by 9.</td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  Difference between sums of odd & even positions is 0 or
                  multiple of 11.
                </td>
                <td>
                  121 → (1+1)-2=0 → divisible by 11.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-success mt-4">Other Useful Rules</h3>
        <ul>
          <li>
            Repeating a 3-digit number twice makes it divisible by 7, 11, and
            13.
          </li>
          <li>A number of the form 2ᴺ has exactly N+1 divisors.</li>
          <li>
            If p and q are co-primes and n is divisible by both, n is divisible
            by p×q.
          </li>
        </ul>

        <h3 className="text-success mt-4">Division Theorem</h3>
        <p>Dividend = (Divisor × Quotient) + Remainder</p>
        <ul>
          <li>(xⁿ - aⁿ) is divisible by (x - a) for all n.</li>
          <li>(xⁿ - aⁿ) is divisible by (x + a) for even n.</li>
          <li>(xⁿ + aⁿ) is divisible by (x + a) for odd n.</li>
        </ul>

        <h3 className="text-success mt-4">Cyclicity of Numbers</h3>
        <p>
          The cyclicity of a number depends on its unit digit — certain digits
          repeat in patterns when raised to powers.
        </p>
        <ul>
          <li>0, 1, 5, 6 → Always same unit digit.</li>
          <li>4, 9 → Repeat every 2 powers.</li>
          <li>2, 3, 7, 8 → Repeat every 4 powers.</li>
        </ul>

        <div className="alert alert-info mt-4">
          <strong>Example:</strong>  
          4² = 16 → unit digit 6, 4³ = 64 → unit digit 4.  
          2⁴ = 16 → unit digit 6, pattern repeats every 4 powers.
        </div>
      </div>
    </div>
  );
};

export default NumbersArticle;
