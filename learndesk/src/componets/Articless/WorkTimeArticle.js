import { useNavigate } from "react-router-dom";

const WorkTimeArticle = () => {
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
        <h1 className="text-center text-primary mb-4">Work, Time and Wages</h1>

        <p>
          <b>Work</b> refers to the physical or mental effort exerted by an individual to produce goods or provide services in exchange for compensation (wages) or other benefits.
        </p>
        <p>
          <b>Wage</b> is the monetary payment an employee receives for their labor, typically calculated on an hourly, daily, or piece-rate basis.
        </p>
        <p>
          <b>Time</b> refers to the duration or period required to complete a specific task or amount of work.
        </p>
        <p>This article provides comprehensive explanations and examples that are easy to follow.</p>

        <h3 className="text-success mt-4">Fundamental Concepts and Formulas</h3>
        <ul>
          <li>If a person can do a piece of work in ‘n’ days, then in one day, the person will do ‘1/n’ work.</li>
          <li>Work Equivalence: Work done = Rate of Work × Time</li>
          <li>If two people work at different rates, total work done: R1 T1 = R2 T2</li>
          <li>Rate of Work = Number of Workers × Number of Days → M1 D1 T1 = M2 D2 T2</li>
          <li>With hours and efficiency: (M1 D1 H1 E1)/W1 = (M2 D2 H2 E2)/W2</li>
        </ul>

        <h3 className="text-success mt-4">Example Problem</h3>
        <p>
          A painter can complete a job in 6 days working alone. If he works with a helper who is twice as efficient, how long will it take them together to complete the job?
        </p>
        <ul>
          <li>Painter's rate: R1 = 1/6 of the job per day</li>
          <li>Helper's rate: R2 = 2 × R1 = 1/3 of the job per day</li>
          <li>Combined Rate: R1 + R2 = 1/2</li>
          <li>Time together: T = 1 / (R1 + R2) = 2 days</li>
        </ul>
        <p><b>Conclusion:</b> They will finish the job in 2 days.</p>

        <h3 className="text-success mt-4">Shortcut Tricks</h3>
        <ul>
          <li>Find the efficiency of a person</li>
          <li>Find the time taken by an individual or group to do a piece of work</li>
          <li>Work done by an individual or group in a certain time duration</li>
        </ul>

        <h3 className="text-success mt-4">Shortcut Example 1: Two Individuals</h3>
        <p>
          The below example illustrates a shortcut trick for calculating the time taken by two individuals, A and B, to complete a task together, based on their individual work rates.
        </p>
        <ul>
          <li><b>No. of Days:</b> A takes 20 days, B takes 30 days</li>
          <li><b>Efficiency:</b> A = 3 units/day, B = 2 units/day</li>
          <li><b>Work:</b> Total work = LCM(20,30) = 60 units</li>
          <li><b>Time:</b> Time = Total Work / (Efficiency of A + Efficiency of B) = 60 / (3 + 2) = 12 days</li>
        </ul>

        <h3 className="text-success mt-4">Shortcut Example 2: Three Individuals</h3>
        <p>
          The below example demonstrates a shortcut trick for calculating the combined work rate of individuals A, B, and C based on their individual work days.
        </p>
        <ul>
          <li><b>No. of Days:</b></li>
          <ul>
            <li>A + B together take 18 days (efficiency 4 units/day)</li>
            <li>A + B together take 24 days (efficiency 3 units/day)</li>
            <li>A + B together take 36 days (efficiency 2 units/day)</li>
          </ul>
          <li><b>Efficiency:</b> Efficiency values represent the work units completed per day by A and B together</li>
          <li><b>Work:</b> Total work = LCM(18, 24, 36) = 72 units</li>
          <li><b>Work done by A:</b> 1.5 units/day → 72 / 1.5 = 48 days</li>
          <li><b>Work done by B:</b> 2.5 units/day → 72 / 2.5 = 28.8 days</li>
          <li><b>Work done by C:</b> 0.5 units/day → 72 / 0.5 = 144 days</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkTimeArticle;
