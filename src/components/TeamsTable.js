import { useSelector } from "react-redux";
function TeamsTable() {
  const teams = useSelector((state) => {
    return state.teams;
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
        {teams.map((team) => (
          <tr key={team.id} id={team.id}>
            <td>{team.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamsTable;
