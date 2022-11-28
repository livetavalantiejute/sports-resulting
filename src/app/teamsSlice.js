import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "teams",
  //Initially, there are no teams and no pairings
  initialState: {
    count: localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")).teams.count
      : 0,
    teams: localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")).teams.teams
      : [],
    pairings: localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")).teams.pairings
      : [],
  },
  reducers: {
    //ADD TEAM
    addTeam: (state, action) => {
      //declare New team with no games
      const newTeam = {
        id: state.count,
        name: action.payload.team,
        played: 0,
        won: 0,
        lost: 0,
        draw: 0,
        points: 0,
      };
      //Compare declared new team name with existing teams
      const existingTeam = state.teams.find((team) => {
        return (
          team.name.toLowerCase().trim() === newTeam.name.toLowerCase().trim()
        );
      });
      const warningTeamName = "The team currently exists";
      //If new team name does not exist, add new team and increase the count
      if (!existingTeam) {
        state.teams.push(newTeam);
        state.count += 1;

        // ADD PAIRINGS
        // Loop through all teams
        for (let j = 0; j < state.count; j++) {
          //Exclude new team from the loop / if only one team is added, no pairings are made
          if (j !== state.teams.indexOf(newTeam)) {
            //Declare new pairing of every team with new team
            const newPairing = {
              id: "pairing" + state.pairings.length, //id from 0 to count of pairings
              players: [
                {
                  player: state.teams[j],
                  score: 0,
                },
                { player: newTeam, score: 0 },
              ],
              submitted: false,
            };

            state.pairings.push(newPairing);
          }
        }
      } else {
        //If new team name exists, throw alert
        alert(warningTeamName);
      }
    },
    //ADD SCORE
    addScore: (state, action) => {
      //Declare pairing with input scores
      const pairing = {
        id: action.payload.id,
        players: [
          { player: action.payload.player1, score: action.payload.scoreFirst },
          { player: action.payload.player2, score: action.payload.scoreSecond },
        ],
        submitted: action.payload.setSubmitted,
      };

      //UPDATING PAIRING FROM addTeam REDUCER
      //Finding the pairing, made in addTeam reducer
      let madePairingIndex = state.pairings.findIndex((existingPairing) => {
        return existingPairing.id === pairing.id;
      });

      state.pairings[madePairingIndex] = pairing

      //Find played teams
      const playedTeams = state.teams.filter((team) => {
        return pairing.players.some((playerTeam) => {
          team["scoreTemp"] = playerTeam.score; //add temporary key for score, used only for current pairing, resets for every pairing
          return playerTeam.player.id === team.id;
        });
      });

      //FINDING MAX SCORE
      const scores = [];
      playedTeams.forEach((team) => {
        scores.push(team.scoreTemp);

        //No matter the outcome (win/loss), the team's played count increases
        team.played += 1;
      });

      const maxScore = Math.max(...scores);

      //Find team(s) with max score
      const teamMaxScore = playedTeams.filter((team) => {
        return team.scoreTemp === maxScore;
      });

      //If teams with max score count is more than 1, it's a draw
      if (teamMaxScore.length > 1) {
        teamMaxScore.forEach((team) => {
          team.draw += 1;
          team.points += 1;
        });
        //If teams with max score count is 1, team with max score is winner
      } else if (teamMaxScore.length === 1) {
        playedTeams.forEach((team) => {
          if (team.id === teamMaxScore[0].id) {
            teamMaxScore[0].won += 1;
            teamMaxScore[0].points += 3;
          } else {
            team.lost += 1;
          }
        });
        //Backup, incase something goes wrong, e.g. there are nulls in score
      } else {
        alert("Something went wrong");
      }

      //RANKING TEAMS
      state.teams.sort((a, b) => (a.points <= b.points ? 1 : -1));
    },
  },
});

export const { addTeam, addScore } = teamsSlice.actions;

export default teamsSlice.reducer;
