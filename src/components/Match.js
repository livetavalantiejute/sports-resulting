import { useState } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../app/teamsSlice";
import styles from "./Match.module.css";

function Match(props) {
  const dispatch = useDispatch();

  const [score, setScore] = useState({
    first: 0,
    second: 0,
  });
  // const [submitted, setSubmitted] = useState(JSON.parse(localStorage.getItem('state').pairing));

  const handleChange = (event) => {
    setScore({
      ...score,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // setSubmitted(true);

    dispatch(
      addScore({
        scoreFirst: parseInt(score.first),
        scoreSecond: parseInt(score.second),
        id: props.pairing.id,
        player1: props.pairing.players[0].player,
        player2: props.pairing.players[1].player,
        setSubmitted: true,
      })
    );
  };

  return (
    <li className={styles.match}>
      <form onSubmit={onSubmit} className={styles.form}>
        <span className="align-right">
          {props.pairing.players[0].player.name}
        </span>
        {!props.pairing.submitted && (
          <>
            <input
              type="number"
              name="first"
              value={score.first}
              onChange={handleChange}
              className="align-right"
            />{" "}
            :{" "}
            <input
              type="number"
              name="second"
              value={score.second}
              onChange={handleChange}
            />
          </>
        )}
        {props.pairing.submitted && (
          <>
            <span className="align-right">{score.first}</span>:<span className="align-left">{score.second}</span>
          </>
        )}
        <span className="align-left">{props.pairing.players[1].player.name}</span>
        {!props.pairing.submitted && (
          <button className="button" type="submit">
            Submit score
          </button>
        )}
      </form>
    </li>
  );
}

export default Match;
