import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PermutationsCombinations = () => {
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
          Permutations & Combinations (Aptitude Notes)
        </h2>

        <p>
          <strong>Permutations</strong> and <strong>Combinations</strong> are two important
          topics in aptitude and probability. They help us calculate the total
          number of possible arrangements or selections that can be made from a
          given set of items.
        </p>

        <h4 className="text-success mt-4">Basic Definitions</h4>
        <ul>
          <li>
            <strong>Permutation:</strong> An arrangement of objects where the{" "}
            <u>order matters</u>.
          </li>
          <li>
            <strong>Combination:</strong> A selection of objects where the{" "}
            <u>order does not matter</u>.
          </li>
          <li>
            <strong>n:</strong> Total number of items available.
          </li>
          <li>
            <strong>r:</strong> Number of items selected or arranged.
          </li>
        </ul>

        <h4 className="text-success mt-4">Permutations</h4>
        <p>
          The number of ways to arrange <strong>r</strong> items out of{" "}
          <strong>n</strong> distinct items is given by:
        </p>
        <div className="alert alert-info">
          <strong>Formula:</strong> <code>P(n, r) = nPr = n! / (n − r)!</code>
        </div>

        <h5 className="text-primary mt-4">Example 1:</h5>
        <p>
          How many ways can 3 letters be arranged from the letters A, B, C, and D?
        </p>
        <p>
          Here, n = 4 and r = 3 <br />
          nPr = 4! / (4 − 3)! = 24 / 1 = <strong>24 ways</strong>
        </p>

        <h5 className="text-primary mt-4">Permutation of All Items</h5>
        <p>
          If all items are arranged at once, then:
          <br />
          <code>nPn = n!</code>
        </p>
        <p>
          Example: The number of ways to arrange the letters in the word
          <strong> WORD </strong> = 4! = 24
        </p>

        <h5 className="text-primary mt-4">Permutations with Repetition</h5>
        <p>
          When certain items are repeated, we divide by the factorial of their
          repetition counts.
        </p>
        <div className="alert alert-warning">
          <strong>Formula:</strong> <code>n! / (p! × q! × r! ...)</code>, where p, q,
          r, etc. are the counts of identical items.
        </div>
        <p>
          Example: In the word <strong>LEVEL</strong>, L repeats twice and E
          repeats twice.
          <br />
          Number of arrangements = 5! / (2! × 2!) = <strong>30 ways</strong>
        </p>

        <h4 className="text-success mt-4">Combinations</h4>
        <p>
          The number of ways to choose <strong>r</strong> items from{" "}
          <strong>n</strong> distinct items (where the order doesn’t matter) is:
        </p>
        <div className="alert alert-info">
          <strong>Formula:</strong> <code>C(n, r) = nCr = n! / [r! × (n − r)!]</code>
        </div>

        <h5 className="text-primary mt-4">Example 2:</h5>
        <p>
          How many ways can a team of 3 students be selected from 5 students?
        </p>
        <p>
          Here, n = 5 and r = 3 <br />
          nCr = 5! / (3! × 2!) = 10 <br />
          <strong>Answer: 10 ways</strong>
        </p>

        <h4 className="text-success mt-4">
          Relation Between Permutations & Combinations
        </h4>
        <div className="alert alert-secondary">
          <strong>Relation:</strong> <code>nPr = nCr × r!</code>
        </div>
        <p>
          This means that every combination can be arranged in <strong>r!</strong>{" "}
          different ways to form permutations.
        </p>

        <h5 className="text-primary mt-4">Example 3:</h5>
        <p>
          From 5 students, a group of 3 can be chosen in 10 ways (5C3 = 10). Each
          group of 3 can be arranged among themselves in 3! = 6 ways. Therefore,
          total arrangements = 10 × 6 = 60 = 5P3.
        </p>

        <h4 className="text-success mt-4">Special Cases</h4>
        <ul>
          <li>
            <code>nC0 = nCn = 1</code>
          </li>
          <li>
            <code>nC1 = n</code>
          </li>
          <li>
            <code>nCr = nC(n−r)</code>
          </li>
        </ul>

        <h4 className="text-success mt-4">Difference Between Permutation & Combination</h4>
        <table className="table table-bordered text-center mt-3">
          <thead className="table-primary">
            <tr>
              <th>Basis</th>
              <th>Permutation</th>
              <th>Combination</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order</td>
              <td>Matters</td>
              <td>Does not matter</td>
            </tr>
            <tr>
              <td>Formula</td>
              <td>nPr = n! / (n − r)!</td>
              <td>nCr = n! / [r! × (n − r)!]</td>
            </tr>
            <tr>
              <td>Example</td>
              <td>ABC ≠ ACB</td>
              <td>ABC = ACB</td>
            </tr>
            <tr>
              <td>Usage</td>
              <td>Used when arranging objects</td>
              <td>Used when selecting objects</td>
            </tr>
          </tbody>
        </table>

        <div className="alert alert-secondary mt-4">
          <strong>Tip:</strong> If the question uses the word “arrange”, think of
          permutations. If it says “choose” or “select”, think of combinations.
        </div>
      </div>
    </div>
  );
};

export default PermutationsCombinations;
