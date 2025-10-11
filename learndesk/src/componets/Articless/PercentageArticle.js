import { useNavigate } from "react-router-dom";

const PercentageArticle = () => {
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
        <h1 className="text-center text-primary mb-4">Percentage</h1>

        <p>
          In mathematics, a <b>percentage</b> represents a fraction of 100. It is a way of expressing a number as a part of a whole in terms of 100. The symbol <b>%</b> is used to denote percentages. For example, 23/100 can be written as 23%, and 45% can be expressed as 45/100.
        </p>

        <h3 className="text-success mt-4">Percentage Formula</h3>
        <p>
          The formula for calculating the percentage of a value is:
        </p>
        <p className="fw-bold">
          Percentage (P%) = (Part / Whole) × 100
        </p>
        <p>Where:</p>
        <ul>
          <li><b>Part (V2)</b>: The portion of the total value.</li>
          <li><b>Whole (V1)</b>: The total value or quantity.</li>
          <li><b>P%</b>: Percentage of the part with respect to the whole.</li>
        </ul>


        <h3 className="text-success mt-4">How to Calculate Percentage of a Number</h3>
        <p>To calculate the percentage of a number, use:</p>
        <p className="fw-bold">
          Percent of a Number = (Percentage / 100) × Number
        </p>

        <p><b>Example:</b> Calculate 5% of 50</p>
        <ul>
          <li>5% of 50 = 5/100 × 50</li>
          <li>5% of 50 = 0.05 × 50</li>
          <li>5% of 50 = 2.50</li>
        </ul>

        <h3 className="text-success mt-4">Percentage Difference / Percentage Change</h3>
        <p>
          Percentage difference or change is used to measure the change between two values. It is calculated as:
        </p>
        <p className="fw-bold">
          Percentage Difference = (|Value1 - Value2| / Average of Values) × 100
        </p>

        <p><b>Example:</b> Percentage difference between 50 and 100</p>
        <ul>
          <li>Absolute difference = |50 - 100| = 50</li>
          <li>Average = (50 + 100)/2 = 75</li>
          <li>Percentage difference = 50 / 75 × 100 = 66.66%</li>
        </ul>

        <h3 className="text-success mt-4">Percentage Chart</h3>
        <p>Here is a quick reference chart for fractions converted into percentages:</p>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Fraction</th>
                <th>Percentage</th>
                <th>Fraction</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1/1</td><td>100%</td><td>1/11</td><td>9.09%</td></tr>
              <tr><td>1/2</td><td>50%</td><td>1/12</td><td>8.33%</td></tr>
              <tr><td>1/3</td><td>33.33%</td><td>1/13</td><td>7.69%</td></tr>
              <tr><td>1/4</td><td>25%</td><td>1/14</td><td>7.14%</td></tr>
              <tr><td>1/5</td><td>20%</td><td>1/15</td><td>6.66%</td></tr>
              <tr><td>1/6</td><td>16.66%</td><td>1/16</td><td>6.25%</td></tr>
              <tr><td>1/7</td><td>14.28%</td><td>1/17</td><td>5.88%</td></tr>
              <tr><td>1/8</td><td>12.5%</td><td>1/18</td><td>5.55%</td></tr>
              <tr><td>1/9</td><td>11.11%</td><td>1/19</td><td>5.26%</td></tr>
              <tr><td>1/10</td><td>10%</td><td>1/20</td><td>5%</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-success mt-4">Percentage Tricks</h3>
        <p>
          One of the most useful tricks while calculating percentages is:
        </p>
        <p className="fw-bold">
          % × of y = % y of x
        </p>

        <p><b>Example:</b> Solve 300% of 50 using the trick</p>
        <ul>
          <li>300% of 50 = 50% of 300</li>
          <li>50% of 300 = 150</li>
          <li>Therefore, 300% of 50 = 150</li>
        </ul>

        <h3 className="text-success mt-4">Applications of Percentages</h3>
        <ul>
          <li>Calculating profit and loss</li>
          <li>Determining discounts and markups in shopping</li>
          <li>Interest calculations in finance</li>
          <li>Analyzing statistics and data in real life</li>
          <li>Understanding exam scores, grades, and performance percentages</li>
        </ul>

        <h3 className="text-success mt-4">Extra Notes</h3>
        <p>
          Percentages are used in almost all areas of life. Understanding them thoroughly helps in quantitative aptitude, finance, business calculations, and everyday problem-solving. By practicing percentage tricks and formulas, you can calculate them faster and avoid mistakes in competitive exams.
        </p>

      </div>
    </div>
  );
};

export default PercentageArticle;
