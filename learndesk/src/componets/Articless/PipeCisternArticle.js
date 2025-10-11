import { useNavigate } from "react-router-dom";

const PipeCisternArticle = () => {
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
        <h1 className="text-center text-primary mb-4">Pipes and Cisterns</h1>

        <p>
          Pipe and Cistern problems deal with calculating the time taken to fill or empty a tank (cistern) using pipes or taps.
        </p>
        <p>
          <b>Inlet Pipes:</b> Fill the tank with water. <br />
          <b>Outlet Pipes / Leaks:</b> Empty the tank.
        </p>

        <h3 className="text-success mt-4">Fundamentals</h3>
        <ul>
          <li>If a pipe fills a tank in <b>n</b> hours, it fills <b>1/n</b> of the tank in 1 hour.</li>
          <li>If a pipe empties a tank in <b>n</b> hours, it empties <b>1/n</b> of the tank in 1 hour.</li>
          <li>
            If multiple pipes are open together: <br />
            <b>Part filled/emptied in 1 hour = Σ(1/mi) - Σ(1/nj)</b>  
            <br />where <i>mi</i> = time for inlet pipes, <i>nj</i> = time for outlet pipes.
          </li>
        </ul>

        <h3 className="text-success mt-4">Formulas</h3>
        <ul>
          <li>Part filled in 1 hour by one pipe = 1/x (x = hours to fill tank)</li>
          <li>Part emptied in 1 hour by one pipe = 1/y (y = hours to empty tank)</li>
          <li>Two pipes, one filling and one emptying: Net part filled = (y - x)/(xy)</li>
          <li>Two inlet pipes: Time to fill = (x * y)/(x + y)</li>
          <li>Net Work Done = Total work by inlets - Total work by outlets</li>
        </ul>

        <h3 className="text-success mt-4">Shortcut Example</h3>
        <p>
          Example illustrating a shortcut trick for solving pipe and cistern problems:
        </p>
        <ul>
          <li><b>Inlet Pipe:</b> +20 units/hour</li>
          <li><b>Outlet Pipe:</b> -30 units/hour</li>
          <li><b>Efficiency:</b> Inlet = 3 units, Outlet = -2 units</li>
          <li><b>Tank Capacity:</b> 60 units (LCM of 20 and 30)</li>
          <li>
            <b>Time = Total Work / (Efficiency of Inlet + Efficiency of Outlet)</b>  
            → Time = 60 / (3 + (-2)) = 60 hours
          </li>
        </ul>

        <h3 className="text-success mt-4">Example 1</h3>
        <p>
          Two pipes, X and Y, can fill a tank separately in 10 hours and 15 hours, respectively. If both pipes are opened together, time to fill the tank:
        </p>
        <ul>
          <li>Part filled by X in 1 hr = 1/10</li>
          <li>Part filled by Y in 1 hr = 1/15</li>
          <li>Combined per hour = 1/10 + 1/15 = 1/6</li>
          <li>Time to fill = 6 hours</li>
        </ul>

        <h3 className="text-success mt-4">Example 2</h3>
        <p>
          Two pipes, A and B, fill a tank in 8 and 12 hours respectively. A third pipe, C, empties it in 10 hours. Time to fill tank when all three are opened together:
        </p>
        <ul>
          <li>Part filled by A = 1/8</li>
          <li>Part filled by B = 1/12</li>
          <li>Part emptied by C = 1/10</li>
          <li>Net part filled per hour = 1/8 + 1/12 - 1/10 = 13/120</li>
          <li>Time to fill = 120/13 ≈ 9.23 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default PipeCisternArticle;
