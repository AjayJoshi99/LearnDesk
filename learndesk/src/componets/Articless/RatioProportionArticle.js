import { useNavigate } from "react-router-dom";

const RatioProportionArticle = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      {/* Back Button */}
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate("/user/articles")}
      >
        ← Back to Articles
      </button>

      <div className="card shadow-lg border-0 p-4 rounded-3">
        <h1 className="text-center text-primary mb-4">Ratios and Proportions</h1>

        <p>
          <b>Ratios and proportions</b> are fundamental mathematical concepts used for comparison. 
          A <b>ratio</b> compares two quantities of the same unit, while a <b>proportion</b> compares two ratios.
        </p>

        <h3 className="text-success mt-4">Ratio</h3>
        <p>
          A ratio is a comparison of two quantities, expressed as <b>a : b</b> where:
        </p>
        <ul>
          <li><b>a</b> – Antecedent</li>
          <li><b>b</b> – Consequent</li>
        </ul>
        <p>
          The ratio a:b means a/b. It can be read as "a to b." Equivalent ratios are obtained by multiplying or dividing both terms by the same number.
        </p>

        <h4>Ratio Properties</h4>
        <ul>
          <li>Multiplying both antecedent and consequent by the same number does not change the ratio. Example: A:B = nA:nB</li>
          <li>Dividing both antecedent and consequent by the same number does not change the ratio. Example: A:B = A/n:B/n</li>
          <li>If two ratios are equal, their reciprocals are also equal. Example: If A:B = C:D, then B:A = D:C</li>
          <li>Cross-multiplication property: A:B = C:D → A×D = B×C</li>
          <li>Ratios may look the same but represent different actual quantities. Example: 50:60 = 5:6 and 100:120 = 5:6</li>
        </ul>

        <h3 className="text-success mt-4">Proportion</h3>
        <p>
          A proportion compares two ratios. If <b>a:b = c:d</b>, we can write it as <b>a : b :: c : d</b>, where:
        </p>
        <ul>
          <li><b>a</b> and <b>d</b> – Extreme terms</li>
          <li><b>b</b> and <b>c</b> – Mean terms</li>
        </ul>

        <h4>Proportion Properties</h4>
        <ul>
          <li>If A/B = C/D, then A/C = B/D</li>
          <li>If A/B = C/D, then B/A = D/C</li>
          <li>For A:B :: C:D, product of extremes = product of means → A×D = B×C</li>
          <li>If A/B = C/D, then (A+B)/B = (C+D)/D and (A−B)/B = (C−D)/D</li>
        </ul>

        <h3 className="text-success mt-4">Types of Proportions</h3>
        <ul>
          <li>
            <b>Direct Proportion:</b> Two quantities increase or decrease together. 
            <br />Example: If speed increases, distance travelled in the same time also increases.
          </li>
          <li>
            <b>Inverse Proportion:</b> One quantity increases while the other decreases. 
            <br />Example: If speed increases, time to cover the same distance decreases.
          </li>
          <li>
            <b>Continued Proportion:</b> a:b = b:c = c:d → a:b:c:d. 
            <br />If antecedent and consequent differ, convert as ac:cb:bd.
        </li>
        </ul>

        <h3 className="text-success mt-4">Ratio and Proportion Formulas</h3>
        <h4>Compound Ratios:</h4>
        <p>If a:b and c:d are two ratios, the compound ratio is <b>ac:bd</b>.</p>

        <h4>Duplicate, Triplicate, and Sub-Duplicate Ratios:</h4>
        <ul>
          <li>Duplicate ratio of a:b → a²:b²</li>
          <li>Sub-duplicate ratio of a:b → √a:√b</li>
          <li>Triplicate ratio of a:b → a³:b³</li>
        </ul>

        <h4>Proportion Formulas:</h4>
        <ul>
          <li>If a:b = c:d → (a+c):(b+d) → Addendo</li>
          <li>If a:b = c:d → (a−c):(b−d) → Subtrahendo</li>
          <li>If a:b = c:d → (a−b)/b = (c−d)/d → Dividendo</li>
          <li>If a:b = c:d → (a+b)/b = (c+d)/d → Componendo</li>
          <li>If a:b = c:d → a:c = b:d → Alternendo</li>
          <li>If a:b = c:d → b:a = d:c → Invertendo</li>
          <li>If a:b = c:d → (a+b):(a−b) = (c+d):(c−d) → Componendo & Dividendo</li>
          <li>Direct proportion: a ∝ b → a = k×b</li>
          <li>Inverse proportion: a ∝ 1/b → a = k/b</li>
          <li>Dividing or multiplying a ratio by a number gives equivalent ratio.</li>
        </ul>

        <h4>Mean Proportion:</h4>
        <p>
          For a:b = b:c, <b>b² = a×c</b> → b = √(a×c). This b is called the <b>mean proportion</b>.
        </p>

        <h3 className="text-success mt-4">Additional Notes</h3>
        <p>
          Understanding ratios and proportions is essential for solving problems in quantitative aptitude, finance, mixtures, partnership, and real-life comparisons. Practicing properties and formulas allows faster calculation and reduces errors in exams.
        </p>
      </div>
    </div>
  );
};

export default RatioProportionArticle;
