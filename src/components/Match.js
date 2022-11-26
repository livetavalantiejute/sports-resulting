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
        setSubmitted: true
      })
    );
  };

  return (
    <li>
      <form onSubmit={onSubmit} className={styles.form}>
        {props.pairing.players[0].player.name}
        {console.log(props.pairing.submitted)}
{!props.pairing.submitted && (
          <div>
            <input
              type="number"
              name="first"
              value={score.first}
              onChange={handleChange}
            />{" "}
            :
            <input
              type="number"
              name="second"
              value={score.second}
              onChange={handleChange}
            />
          </div>
        )}
        {props.pairing.submitted && (
          <div>
            <span>{score.first}</span>:<span>{score.second}</span>
          </div>
        )}
        {props.pairing.players[1].player.name}
        {!props.pairing.submitted && <button type="submit">Submit score</button>}
      </form>
    </li>
  );
}

export default Match;
