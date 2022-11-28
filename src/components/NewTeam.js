import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam } from "../app/teamsSlice";

import styles from "./NewTeam.module.css";

function NewTeam() {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      alert("Please input a name");
      setValue("");
      return;
    }

    dispatch(
      addTeam({
        team: value,
      })
    );

    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        className={"input " + styles.input}
        placeholder="New team"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <button className="button" type="submit">Add</button>
    </form>
  );
}

export default NewTeam;
