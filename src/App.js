import './App.css';
import store from './app/store';

import MatchList from './components/MatchList';
import NewTeam from './components/NewTeam'
import TeamsTable from './components/TeamsTable';

store.subscribe(()=>{
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

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
