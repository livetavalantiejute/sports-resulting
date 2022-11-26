import { useSelector } from "react-redux";

import Match from './Match'

function MatchList() {
  const teamPairings = useSelector((state) => {
    return state.teams.pairings;
  });

  return (
    <ul>
      {teamPairings.map((pairing) => (
        <Match pairing={pairing} key={pairing.id}/>
      ))}
    </ul>
  );
}

export default MatchList;
