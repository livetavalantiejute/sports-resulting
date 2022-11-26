import { useSelector } from "react-redux";

import Match from "./Match";

import styles from "./MatchList.module.css";

function MatchList() {
  const teamPairings = useSelector((state) => {
    return state.teams.pairings;
  });

  return (
    <ul className={styles.matchList}>
      {teamPairings.map((pairing) => (
        <Match pairing={pairing} key={pairing.id} />
      ))}
    </ul>
  );
}

export default MatchList;
