import './App.css';
import MatchList from './components/MatchList';

import NewTeam from './components/NewTeam'
import TeamsTable from './components/TeamsTable';

function App() {
  return (
    <div className="App">
      <NewTeam />
      <TeamsTable />
      <MatchList />
    </div>
  );
}

export default App;
