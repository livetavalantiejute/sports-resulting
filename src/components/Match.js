import { useState } from "react";

function Match(props) {
  const [score, setScore] = useState({
    first: 0,
    second: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setScore({
      ...score,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <li>
      <form onSubmit={onSubmit}>
        {props.pairing.player1.name}
        {!submitted && (
          <input
            type="number"
            name="first"
            value={score.first}
            onChange={handleChange}
          />
        )}
        {submitted && <span>{score.first}</span>}:
        {submitted && <span>{score.second}</span>}
        {!submitted && (
          <input
            type="number"
            name="second"
            value={score.second}
            onChange={handleChange}
          />
        )}
        {props.pairing.player2.name}
        {!submitted && <button type="submit">Submit score</button>}
      </form>
    </li>
  );
}

export default Match;
