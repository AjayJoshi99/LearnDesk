import { useNavigate } from "react-router-dom";

const BoatsAndStreamsArticle = () => {
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
          Boats and Streams
        </h1>

        <p>
          Boats and Streams is a very common topic in aptitude. These questions 
          are based on relative speed between the boat and the stream. 
          If the direction of the stream helps the motion, speed increases; 
          if it opposes, speed decreases.
        </p>

        <h2 className="text-success mt-4">Key Terminology</h2>
        <ul>
          <li>
            <b>Stream / Current:</b> The speed of flowing water.
          </li>
          <li>
            <b>Still Water:</b> Water that has no flow. Speed of boat in still water is denoted by <b>b</b>.
          </li>
          <li>
            <b>Downstream:</b> Boat moves <u>with</u> the current. Speed increases.
          </li>
          <li>
            <b>Upstream:</b> Boat moves <u>against</u> the current. Speed decreases.
          </li>
        </ul>

        <h3 className="text-success mt-4">Basic Formulas</h3>
        <ul>
          <li>
            <b>Downstream Speed (D):</b>  
            D = b + s  
            <br /><i>(b = boat speed in still water, s = stream speed)</i>
          </li>

          <li>
            <b>Upstream Speed (U):</b>  
            U = b - s
          </li>

          <li>
            <b>Boat Speed in Still Water:</b>  
            b = (D + U) / 2
          </li>

          <li>
            <b>Stream Speed:</b>  
            s = (D - U) / 2
          </li>

          <li>
            <b>Time = Distance / Speed</b>
          </li>
        </ul>

        <h3 className="text-success mt-4">Examples</h3>
        <ul>
          <li>
            Downstream:  
            If a boat moves 36 km in 3 hours downstream →  
            Speed = 36 / 3 = 12 km/h.
          </li>

          <li>
            Upstream:  
            If the boat moves 20 km in 4 hours upstream →  
            Speed = 20 / 4 = 5 km/h.
          </li>

          <li>
            If downstream speed = 12 and upstream speed = 5 →  
            Boat speed = (12 + 5)/2 = 8.5 km/h  
            Stream speed = (12 - 5)/2 = 3.5 km/h
          </li>
        </ul>

        <h3 className="text-success mt-4">Important Concepts</h3>
        <ul>
          <li>
            When the stream helps → speed increases → time decreases.
          </li>
          <li>
            When the stream opposes → speed decreases → time increases.
          </li>
          <li>
            Relative speed is the core idea.
          </li>
        </ul>

        <h3 className="text-success mt-4">Practice Rules</h3>
        <ul>
          <li>
            If the speed of stream increases, upstream time increases significantly.
          </li>
          <li>
            If distance is same upstream and downstream, use:
            <br />
            <b>Total Time = (d / U) + (d / D)</b>
          </li>
        </ul>

        <div className="alert alert-info mt-4">
          <strong>Example Problem:</strong><br />
          A boat takes 4 hours to travel 32 km downstream and 8 hours upstream.  
          <br />
          Downstream speed = 32/4 = 8 km/h  
          Upstream speed = 32/8 = 4 km/h  
          <br />
          Boat speed = (8 + 4)/2 = 6 km/h  
          Stream speed = (8 - 4)/2 = 2 km/h
        </div>
      </div>
    </div>
  );
};

export default BoatsAndStreamsArticle;
