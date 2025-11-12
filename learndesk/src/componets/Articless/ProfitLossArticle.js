import { useNavigate } from "react-router-dom";

const ProfitLossArticle = () => {
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
        <h1 className="text-center text-primary mb-4">Profit and Loss</h1>

        <p>
          <b>Profit and Loss</b> is one of the most crucial topics in the{" "}
          <b>Quantitative Aptitude</b> section of competitive exams. A clear understanding
          of the <b>Cost Price (CP)</b> and <b>Selling Price (SP)</b> along with their
          relationships helps in solving questions quickly and accurately.
        </p>

        <h3 className="text-success mt-4">Profit and Loss Basic Concepts</h3>
        <p>Let us begin with some key terminology:</p>
        <ul>
          <li>
            <b>Profit:</b> The extra money earned when Selling Price (SP) &gt; Cost Price
            (CP).
          </li>
          <li>
            <b>Loss:</b> The money lost when Selling Price (SP) &lt; Cost Price (CP).
          </li>
          <li>
            <b>Cost Price (CP):</b> The price at which an article is purchased.
          </li>
          <li>
            <b>Selling Price (SP):</b> The price at which an article is sold.
          </li>
          <li>
            <b>Marked Price (MP):</b> The listed price before any discount.
          </li>
          <li>
            <b>Discount:</b> The reduction applied to the marked price to attract buyers.
          </li>
        </ul>

        <h3 className="text-success mt-4">Profit and Loss Formulas</h3>
        <p>
          These are the most commonly used formulas in profit and loss problems. Mastering
          them ensures faster calculations:
        </p>

        <table className="table table-bordered text-center table-striped">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Formula</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Profit</td>
              <td>SP − CP</td>
              <td>SP &gt; CP</td>
            </tr>
            <tr>
              <td>Loss</td>
              <td>CP − SP</td>
              <td>CP &gt; SP</td>
            </tr>
            <tr>
              <td>Profit %</td>
              <td>(Profit / CP) × 100</td>
              <td>SP &gt; CP</td>
            </tr>
            <tr>
              <td>Loss %</td>
              <td>(Loss / CP) × 100</td>
              <td>CP &gt; SP</td>
            </tr>
            <tr>
              <td>SP (with Profit %)</td>
              <td>[(100 + Profit%) / 100] × CP</td>
              <td>SP &gt; CP</td>
            </tr>
            <tr>
              <td>SP (with Loss %)</td>
              <td>[(100 − Loss%) / 100] × CP</td>
              <td>SP &lt; CP</td>
            </tr>
            <tr>
              <td>CP (with Profit %)</td>
              <td>[100 / (100 + Profit%)] × SP</td>
              <td>SP &gt; CP</td>
            </tr>
            <tr>
              <td>CP (with Loss %)</td>
              <td>[100 / (100 − Loss%)] × SP</td>
              <td>CP &gt; SP</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>MP − SP</td>
              <td>–</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-success mt-4">Shortcut Method for Profit and Loss</h3>
        <p>
          The shortcut method helps find profit percentage quickly when <b>CP</b> and{" "}
          <b>SP</b> are given as ratios.
        </p>

        <h5 className="mt-3">Example 1:</h5>
        <p>
          Step 1: Write the ratio of CP to SP, then simplify it to <b>a:b</b> where a and b
          are integers with no common factors.
        </p>
        <p>
          Step 2: Calculate profit percentage using:
          <br />
          <b>Profit% = ((b − a) / a) × 100</b>
        </p>
        <p>
          Here, <b>b − a</b> represents profit, and <b>a</b> is the cost base.
        </p>

        <h5 className="mt-3">Example 2:</h5>
        <p>
          Step 1: Write the ratio of <b>CP : SP</b> and <b>SP : MP</b>.
        </p>
        <p>
          Step 2: Simplify both ratios and make sure they have a <b>common SP base</b> for
          easy comparison.
        </p>
        <p>
          Step 3: Use the same formula —{" "}
          <b>Profit% = ((b − a) / a) × 100</b> — to determine the percentage profit or loss.
        </p>

        <h3 className="text-success mt-4">Profit and Loss Examples</h3>

        <h5 className="mt-3">Example 1:</h5>
        <p>
          <b>Problem:</b> A person purchases notebooks at Rs. 12 for 30 notebooks and sells
          them at Rs. 15 for 20 notebooks. Find the profit or loss percentage.
        </p>

        <p>
          <b>Solution:</b>
        </p>
        <pre className="bg-light p-3 rounded">
          CP per notebook = 12 / 30 = Rs. 0.40{"\n"}
          SP per notebook = 15 / 20 = Rs. 0.75{"\n"}
          Profit = SP − CP = 0.75 − 0.40 = Rs. 0.35{"\n"}
          Profit% = (0.35 / 0.40) × 100 = 87.5%
        </pre>
        <p>
          Therefore, the profit percentage is <b>87.5%</b>.
        </p>

        <h5 className="mt-3">Example 2:</h5>
        <p>
          <b>Problem:</b> A retailer offers two successive discounts of 15% and 25%, and an
          additional 10% discount for members. If the Marked Price (MP) is Rs. 1000, find
          the overall discount percentage.
        </p>

        <p>
          <b>Solution:</b>
        </p>
        <pre className="bg-light p-3 rounded">
          MP = Rs. 1000{"\n"}
          First discount = 15% of 1000 = Rs. 150{"\n"}
          Price after 1st discount = 1000 − 150 = Rs. 850{"\n"}
          Second discount = 25% of 850 = Rs. 212.50{"\n"}
          Price after 2nd discount = 850 − 212.50 = Rs. 637.50{"\n"}
          Member discount = 10% of 637.50 = Rs. 63.75{"\n"}
          Final price = 637.50 − 63.75 = Rs. 573.75{"\n"}
          Total discount = 1000 − 573.75 = Rs. 426.25{"\n"}
          Overall Discount% = (426.25 / 1000) × 100 = 42.63%
        </pre>
        <p>
          Therefore, the <b>overall discount percentage</b> on the shoes is{" "}
          <b>42.63%</b>.
        </p>

        <h3 className="text-success mt-4">Tips for Profit & Loss Questions</h3>
        <ul>
          <li>Always remember the relation: SP = CP × (100 ± Profit/Loss%) / 100.</li>
          <li>Use ratios for quicker calculations in successive transactions.</li>
          <li>When multiple discounts are offered, apply them sequentially, not additively.</li>
          <li>Convert all values to per-item basis if quantities differ.</li>
          <li>Practice using the shortcut ratio method for exam speed.</li>
        </ul>

        <h3 className="text-success mt-4">Quick Recap</h3>
        <p>
          Profit and Loss concepts are vital for banking, SSC, and placement exams. Learn
          the core formulas, practice ratio-based tricks, and solve various examples to gain
          accuracy and speed in this topic.
        </p>
      </div>
    </div>
  );
};

export default ProfitLossArticle;
