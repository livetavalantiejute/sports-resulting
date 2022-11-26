import { useState } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../app/teamsSlice";

function Match(props) {
  const dispatch = useDispatch();

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

    dispatch(
      addScore({
        scoreFirst: parseInt(score.first),
        scoreSecond: parseInt(score.second),
        id: props.pairing.id,
        player1: props.pairing.players[0].player,
        player2: props.pairing.players[1].player
      })
    );
  };

  return (
    <li>
      <form onSubmit={onSubmit}>
        {props.pairing.players[0].player.name}
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
        {props.pairing.players[1].player.name}
        {!submitted && <button type="submit">Submit score</button>}
      </form>
    </li>
  );
}

export default Match;
