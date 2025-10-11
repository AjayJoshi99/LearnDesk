import { useNavigate } from "react-router-dom";

const SpeedDistanceTimeArticle = () => {
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
        <h1 className="text-center text-primary mb-4">
          Speed, Time, and Distance
        </h1>

        <p>
          Speed, distance, and time are essential concepts for solving motion-related problems in competitive exams. Understanding their inter-relationships helps interpret questions about straight-line motion, circular motion, boats and streams, races, clocks, etc.
        </p>

        <h3 className="text-success mt-4">Units</h3>
        <ul>
          <li><b>Speed:</b> km/h, m/s, mph, ft/s</li>
          <li><b>Time:</b> seconds (s), minutes (min), hours (h), days (d)</li>
          <li><b>Distance:</b> km, m, miles, ft</li>
        </ul>
        <p>
          Conversion: km/h → m/s = × 5/18, m/s → km/h = × 18/5
        </p>

        <h3 className="text-success mt-4">Basic Formulas</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>Term</th>
              <th>Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Speed</td>
              <td>Speed = Distance / Time</td>
            </tr>
            <tr>
              <td>Distance</td>
              <td>Distance = Speed × Time</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>Time = Distance / Speed</td>
            </tr>
            <tr>
              <td>Average Speed</td>
              <td>Total Distance / Total Time</td>
            </tr>
            <tr>
              <td>Average Speed (Half distance X & Y)</td>
              <td>2XY / (X + Y)</td>
            </tr>
            <tr>
              <td>Relative Speed (Opposite direction)</td>
              <td>Speed = X + Y, Time = (L1 + L2) / (X + Y)</td>
            </tr>
            <tr>
              <td>Relative Speed (Same direction)</td>
              <td>Speed = X - Y, Time = (L1 + L2) / (X - Y)</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-success mt-4">Conversions & Applications</h3>
        <ul>
          <li>Round trip speed: T = Distance × (S1S2 / (S1+S2))</li>
          <li>Two trains crossing each other: S1+S2 = (L1+L2)/t</li>
          <li>Two trains in same direction: S1-S2 = (L1+L2)/t</li>
          <li>Train crossing platform/bridge: S = (L1 + L2)/t</li>
          <li>Relative speed for two people: A/B = √T2 / √T1</li>
        </ul>

        <h3 className="text-success mt-4">Examples</h3>

        <h5>Example 1</h5>
        <p>
          A cyclist completes a 1200 m race in 3 minutes. Can he beat another cyclist at 25 km/hr?
        </p>
        <ul>
          <li>Speed of first cyclist = 1200 / 180 = 6.67 m/s = 24 km/h</li>
          <li>Speed of second cyclist = 25 km/h</li>
          <li>Conclusion: First cyclist cannot beat the second.</li>
        </ul>

        <h5>Example 2</h5>
        <p>
          A student walks one way and cycles back in 5 hours. Cycling both ways takes 3 hours. How long if walking both ways?
        </p>
        <ul>
          <li>Time to cycle one side = 3/2 = 1.5 hr</li>
          <li>Time to walk one side = 5 – 1.5 = 3.5 hr</li>
          <li>Total time walking both ways = 2 × 3.5 = 7 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default SpeedDistanceTimeArticle;
