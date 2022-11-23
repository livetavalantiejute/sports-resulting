import { useSelector } from "react-redux";

function MatchList() {
  const teamPairings = useSelector((state) => {
    return state.teams.pairings;
  });

  return (
    <ul>
      {teamPairings.map((pairing) => (
        <li>{pairing.player1.name} - {pairing.player2.name}</li>
      ))}
    </ul>
  );
}

export default MatchList;
