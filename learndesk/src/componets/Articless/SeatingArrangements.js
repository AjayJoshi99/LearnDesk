import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SeatingArrangementsArticle = () => {
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
          Seating Arrangements - Terms, Tips & Tricks
        </h1>

        <p>
          Seating arrangement questions are common in logical reasoning and
          aptitude tests. To solve them effectively, understanding certain key
          terms, visualization techniques, and step-by-step strategies is
          crucial. Let's go through all the essential concepts.
        </p>

        <h2 className="text-success mt-4">Terms Related to Seating Arrangements</h2>
        <ul>
          <li>
            <b>Adjacent:</b> Individuals or items that are next to each other in
            the arrangement, either horizontally or vertically.
          </li>
          <li>
            <b>Alternate:</b> A pattern where individuals or items are placed in
            every other position, skipping one in between.
          </li>
          <li>
            <b>Between:</b> Refers to an individual or item positioned in the
            middle of two others.
          </li>
          <li>
            <b>Clockwise:</b> A direction that follows the movement of a clock's
            hands, typically used in circular seating arrangements.
          </li>
          <li>
            <b>Counter-clockwise:</b> The opposite direction to the movement of
            a clock's hands, commonly used in circular seating scenarios.
          </li>
          <li>
            <b>Diagonal:</b> Individuals or items that are placed diagonally
            across from each other in the arrangement.
          </li>
          <li>
            <b>Facing:</b> When individuals or items are oriented to look at
            each other directly, often used in circular arrangements.
          </li>
          <li>
            <b>Opposite:</b> Individuals or items positioned directly across
            from each other, often used in circular or linear arrangements.
          </li>
        </ul>

        <h2 className="text-success mt-4">
          Tips and Tricks for Solving Seating Arrangements
        </h2>
        <ul>
          <li>
            Take a quick glance at all given information to get a mental picture
            of the situation.
          </li>
          <li>
            Determine which statements are <b>definite</b> and which are{" "}
            <b>comparative</b>.
          </li>
          <li>
            Assume that all people are facing the center unless the direction is
            specified otherwise.
          </li>
          <li>
            <b>Comparative information:</b> Describes relative positions (e.g.,
            A is sitting left to D).
          </li>
          <li>
            <b>Definite information:</b> Describes exact placement (e.g., A is
            sitting on the right end).
          </li>
          <li>
            <b>Negative information:</b> Eliminates possibilities (e.g., A is
            not sitting immediate left to B).
          </li>
          <li>
            Imagine yourself among them — this helps visualize positions easily.
          </li>
          <li>
            Decode the statements step by step and represent them pictorially
            for better understanding.
          </li>
          <li>Start solving with 100% definite information first.</li>
          <li>
            Then move on to indirect or negative statements to refine the
            arrangement.
          </li>
          <li>
            If multiple possibilities arise, draw separate diagrams for each.
          </li>
          <li>
            Eliminate the arrangements that contradict any statement and keep
            the correct one.
          </li>
        </ul>

        <h2 className="text-success mt-4">
          Best Tricks for Seating Arrangement Questions
        </h2>
        <ul>
          <li>
            <b>Grouping and Clustering Technique:</b> Identify individuals who
            share relationships like “next to,” “opposite,” or “between.”
          </li>
          <li>
            <b>Visualization Strategy:</b> Before solving, mentally visualize
            how the circle or line will look with people placed in it.
          </li>
          <li>
            <b>Dynamic Elimination Process:</b> As you find correct placements,
            eliminate the impossible ones to simplify your diagram.
          </li>
          <li>
            <b>Practice with Previous Questions:</b> Regular practice helps you
            recognize common patterns faster.
          </li>
        </ul>

        <div className="alert alert-info mt-4">
          <strong>Pro Tip:</strong>  
          Always draw clear and simple diagrams.  
          Use initials instead of full names to save time, and mark directions
          clearly (Left/Right or Clockwise/Counterclockwise).
        </div>

        <div className="alert alert-warning mt-3">
          <strong>Remember:</strong>  
          Seating arrangement puzzles test your logical sequencing and
          visualization skills — not just memory!
        </div>

        <p className="mt-4 text-muted">
          With consistent practice and smart elimination strategies, you can
          easily solve even complex seating arrangement puzzles in a short
          amount of time.
        </p>
      </div>
    </div>
  );
};

export default SeatingArrangementsArticle;
