import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CodingDecoding = () => {
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
          Coding and Decoding (Aptitude Notes)
        </h2>

        <p>
          Coding-Decoding is a common topic in the reasoning section of competitive exams. It evaluates your ability to identify hidden patterns and relationships between letters, numbers, or symbols used to represent information.
        </p>

        <div className="alert alert-info">
          <strong>Definition:</strong> Coding-Decoding involves transforming letters, numbers, or symbols using a specific rule or pattern. The challenge is to figure out the logic and either encode or decode the given data.
        </div>

        <h4 className="text-success mt-4">Types of Coding-Decoding</h4>
        <ol>
          <li>Letter-based Coding</li>
          <li>Number-based Coding</li>
          <li>Symbol-based Coding</li>
        </ol>

        <h5 className="text-primary mt-4">Letter Coding</h5>
        <p>
          In Letter Coding, each letter in a word is replaced by another letter according to a specific rule or pattern.
        </p>

        <div className="card p-3 mb-3 border-0 shadow-sm">
          <p>
            <strong>Example:</strong> If <code>JUNE</code> is coded as <code>HSLC</code>, determine the code for <code>JULY</code>.
          </p>
          <p>
            Each letter is shifted two positions backward in the alphabet: <br />
            <code>J → H, U → S, L → J, Y → W</code>
          </p>
          <p>
            Therefore, <strong>JULY → HSJW</strong>.
          </p>
        </div>

        <h5 className="text-primary mt-4">Number Coding</h5>
        <p>
          In Number Coding, letters are represented by numbers according to a hidden relationship, which you need to identify.
        </p>

        <div className="card p-3 mb-3 border-0 shadow-sm">
          <p>
            <strong>Example:</strong> If <code>GEEKS = 35542</code> and <code>GAME = 3895</code>, find the code for <code>SKEEG</code>.
          </p>
          <p>
            Mapping: G → 3, E → 5, K → 4, S → 2, A → 8, M → 9 <br />
            Therefore, <strong>SKEEG → 2 4 5 5 3</strong>.
          </p>
        </div>

        <h5 className="text-primary mt-4">Symbol Coding</h5>
        <p>
          In Symbol Coding, symbols are assigned numerical values, and calculations are performed based on those values.
        </p>

        <div className="card p-3 mb-3 border-0 shadow-sm">
          <p>
            <strong>Example:</strong> If <code>⋆ = 5</code>, <code>△ = 10</code>, <code>□ = 15</code>, and <code>⋄ = 20</code>, find the value of <code>⋆ + △ + ⋄</code>.
          </p>
          <p>
            Substitute the values: 5 + 10 + 20 = <strong>35</strong>
          </p>
        </div>

        <h4 className="text-success mt-4">Important Tricks</h4>
        <ul>
          <li>Remember the positions of letters in the alphabet: <strong>A=1, B=2, C=3, ..., Z=26</strong></li>
          <li>To find the reverse value of a letter, use the formula: <code>Reverse = 27 - Position</code>. Example: Reverse of A(1) = 26 → Z</li>
          <li>Check whether letters are shifted forward, backward, or replaced with their reverse alphabet.</li>
          <li>For number-based coding, look for patterns involving sums, differences, multiplication, or positional coding.</li>
        </ul>

        <div className="alert alert-secondary mt-4">
          <strong>Tip:</strong> Before attempting coding-decoding questions, write down the alphabet from A to Z with their numerical positions. This makes it easier to spot patterns during exams.
        </div>
      </div>
    </div>
  );
};

export default CodingDecoding;
