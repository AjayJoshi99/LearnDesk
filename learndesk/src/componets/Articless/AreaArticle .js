import { useNavigate } from "react-router-dom";

const AreaArticle = () => {
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
          Area
        </h1>

        <p>
          Area is a fundamental topic in aptitude and mathematics. 
          These questions deal with finding the space occupied by different 
          geometrical shapes like squares, rectangles, triangles, and circles.
          Knowing formulas and quick comparisons is the key to solving area problems.
        </p>

        <h2 className="text-success mt-4">Key Terminology</h2>
        <ul>
          <li>
            <b>Area:</b> The region covered by a plane figure.
          </li>
          <li>
            <b>Perimeter:</b> The total length of the boundary of a shape.
          </li>
          <li>
            <b>Base & Height:</b> Used mainly in triangles and parallelograms.
          </li>
          <li>
            <b>Radius:</b> Distance from center to boundary of a circle.
          </li>
        </ul>

        <h3 className="text-success mt-4">Basic Formulas</h3>
        <ul>
          <li>
            <b>Square:</b>  
            Area = side²
          </li>

          <li>
            <b>Rectangle:</b>  
            Area = length * breadth
          </li>

          <li>
            <b>Triangle:</b>  
            Area = (1/2) * base * height
          </li>

          <li>
            <b>Circle:</b>  
            Area = πr²  
            <br />
            <i>(Use π = 22/7 or 3.14)</i>
          </li>

          <li>
            <b>Parallelogram:</b>  
            Area = base * height
          </li>
        </ul>

        <h3 className="text-success mt-4">Examples</h3>
        <ul>
          <li>
            Square with side 6 cm →  
            Area = 6 * 6 = 36 cm²
          </li>

          <li>
            Rectangle of length 8 cm and breadth 5 cm →  
            Area = 8 * 5 = 40 cm²
          </li>

          <li>
            Triangle with base 10 cm and height 6 cm →  
            Area = (1/2) * 10 * 6 = 30 cm²
          </li>

          <li>
            Circle with radius 7 cm →  
            Area = (22/7) * 7 * 7 = 154 cm²
          </li>
        </ul>

        <h3 className="text-success mt-4">Important Concepts</h3>
        <ul>
          <li>
            Figures with same perimeter can have different areas.
          </li>
          <li>
            For a fixed perimeter, a circle has the maximum area.
          </li>
          <li>
            Units of area are always squared (cm², m², km²).
          </li>
        </ul>

        <h3 className="text-success mt-4">Practice Rules</h3>
        <ul>
          <li>
            Always convert units before calculating area.
          </li>
          <li>
            When comparing areas, avoid full calculation if ratios can be used.
          </li>
          <li>
            For composite figures, break them into simple shapes.
          </li>
        </ul>

        <div className="alert alert-info mt-4">
          <strong>Example Problem:</strong><br />
          A rectangular field has length 50 m and breadth 30 m.  
          <br />
          Area = 50 * 30 = 1500 m²
        </div>
      </div>
    </div>
  );
};

export default AreaArticle;
