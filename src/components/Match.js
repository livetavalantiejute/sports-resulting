import { useState } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../app/teamsSlice";

import styles from "./Match.module.css";

function Match(props) {
  const dispatch = useDispatch();

  const [score, setScore] = useState({
    first: props.pairing.players[0].score,
    second: props.pairing.players[1].score
  });

  //Prevent pasting negative value
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const handleChange = (event) => {
    //Prevent negative value
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    if (event.code === "Minus") {
      event.preventDefault();
    }

    setScore({
      ...score,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addScore({
        scoreFirst: score.first,
        scoreSecond: score.second,
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
              onPaste={preventPasteNegative}
              className="align-right"
            /><span>:</span>
            <input
              type="number"
              name="second"
              value={score.second}
              onChange={handleChange}
              onPaste={preventPasteNegative}
              className="align-left"
            />
          </>
        )}
        {props.pairing.submitted && (
          <>
            <span className="align-right">{score.first}</span>:
            <span className="align-left">{score.second}</span>
          </>
        )}
        <span className="align-left">
          {props.pairing.players[1].player.name}
        </span>
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
