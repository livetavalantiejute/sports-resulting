import { useSelector } from "react-redux";

function TeamsTable() {
  const teams = useSelector((state) => {
    return state.teams.teams;
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>Place</th>
          <th>Team</th>
          <th>Played</th>
          <th>Win</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, index) => (
          <tr key={team.id} id={team.id}>
            <td>{index + 1}</td>
            <td>{team.name}</td>
            <td>{team.played}</td>
            <td>{team.won}</td>
            <td>{team.draw}</td>
            <td>{team.lost}</td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamsTable;
