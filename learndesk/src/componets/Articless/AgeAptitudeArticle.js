import { useNavigate } from "react-router-dom";

const AgeAptitudeArticle = () => {
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
        <h1 className="text-center text-primary mb-4">Problems on Ages</h1>

        <p>
          <b>Age aptitude questions</b> involve the use of <b>algebraic equations</b> to
          determine a person’s age based on given relationships or data. These problems may
          seem confusing at first, but with regular practice and a clear understanding of
          formulas, they can become quite simple.
        </p>

        <p>
          By mastering <b>problems on age</b>, candidates can enhance their analytical and
          logical reasoning skills — essential for quantitative aptitude and real-life
          problem-solving.
        </p>

        <h3 className="text-success mt-4">Age Problem Formulas</h3>
        <p>
          Here are some key formulas and tricks to help simplify age-related questions:
        </p>
        <ul>
          <li>
            If a person’s <b>present age</b> is <b>x</b>, then:
            <ul>
              <li>Age after <b>n</b> years = (x + n)</li>
              <li>Age before <b>n</b> years = (x − n)</li>
            </ul>
          </li>
          <li>
            If the ages of two people are in the ratio <b>p:q</b>, then their respective ages
            can be written as <b>px</b> and <b>qx</b>.
          </li>
          <li>
            1/n of a person’s age = <b>x/n</b>, if their present age is <b>x</b>.
          </li>
        </ul>

        <p>
          Understanding these relationships helps in forming equations that can quickly
          determine unknown ages.
        </p>

        <h3 className="text-success mt-4">Shortcut Tricks for Problems on Ages</h3>
        <p>
          The following shortcut method helps to solve age problems faster using ratios and
          differences:
        </p>

        <h5 className="mt-3">Case 1:</h5>
        <p>
          Step 1: A and B have a current age ratio of <b>3:2</b>. After 10 years, their age
          ratio will be <b>4:3</b>.
        </p>
        <p>
          Step 2: The increase in ratio terms is 1 for both (A: 3→4, B: 2→3), giving a
          difference of <b>1:1</b>.
        </p>
        <p>
          Step 3: Since the difference matches the 10-year gap, each unit of ratio = 10
          years.
        </p>
        <p>
          <b>Calculation:</b>
        </p>
        <ul>
          <li>A’s present age = 3 × 10 = <b>30 years</b></li>
          <li>B’s present age = 2 × 10 = <b>20 years</b></li>
        </ul>

        <h5 className="mt-3">Case 2:</h5>
        <p>
          Step 1: C and D’s age ratio 5 years ago was <b>4:1</b>. Currently, it is <b>3:1</b>.
        </p>
        <p>
          Step 2: Adjusting ratios — multiply past ratio (4:1) by 2 → 8:2, and current ratio
          (3:1) by 3 → 9:3.
        </p>
        <p>
          Step 3: Subtract → (9−8):(3−2) = 1:1, which equals the 5-year gap. Hence, 1 unit =
          5 years.
        </p>
        <ul>
          <li>C’s present age = 9 × 5 = <b>45 years</b></li>
          <li>D’s present age = 3 × 5 = <b>15 years</b></li>
        </ul>

        <h3 className="text-success mt-4">Example Problems</h3>

        <h5 className="mt-3">Example 1:</h5>
        <p>
          <b>Problem:</b> B’s age after 10 years will be equal to 4 times his age 2 years ago.
          What will be his age 5 years from now?
        </p>
        <p>
          <b>Solution:</b> Let B’s present age = <b>m</b> years.
        </p>
        <pre className="bg-light p-3 rounded">
          m + 10 = 4(m − 2)
          <br />
          m + 10 = 4m − 8
          <br />
          3m = 18
          <br />
          m = 6
        </pre>
        <p>
          Thus, B’s present age = <b>6 years</b> <br />
          Therefore, B’s age after 5 years = 6 + 5 = <b>11 years</b>.
        </p>

        <h5 className="mt-3">Example 2:</h5>
        <p>
          <b>Problem:</b> The ratio of the present ages of C and D is <b>5:6</b>. After 10
          years, this ratio becomes <b>6:7</b>. Find their present ages.
        </p>
        <p>
          <b>Solution:</b> Let the common ratio be <b>m</b>.
        </p>
        <ul>
          <li>C’s present age = 5m years</li>
          <li>D’s present age = 6m years</li>
        </ul>

        <pre className="bg-light p-3 rounded">
          (5m + 10) / (6m + 10) = 6 / 7
          <br />
          7(5m + 10) = 6(6m + 10)
          <br />
          35m + 70 = 36m + 60
          <br />
          m = 10
        </pre>

        <p>
          Hence, C’s present age = 5m = <b>50 years</b> <br />
          D’s present age = 6m = <b>60 years</b>.
        </p>

        <h3 className="text-success mt-4">Tips for Solving Age Problems</h3>
        <ul>
          <li>Always represent current ages using variables like x, y, or m.</li>
          <li>Translate statements directly into equations.</li>
          <li>Compare ages “after n years” or “before n years” carefully.</li>
          <li>Use ratio differences to find time gaps easily.</li>
          <li>Practice both algebraic and ratio-based approaches for speed.</li>
        </ul>

        <h3 className="text-success mt-4">Quick Recap</h3>
        <p>
          Problems on ages combine logic and algebra. With consistent practice of formulas,
          ratios, and basic reasoning, candidates can confidently tackle any age-based
          aptitude question in exams.
        </p>
      </div>
    </div>
  );
};

export default AgeAptitudeArticle;
