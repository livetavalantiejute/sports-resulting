import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    count: 0,
    teams: [],
    pairings: [],
  },
  reducers: {
    addTeam: (state, action) => {
      const newTeam = {
        id: state.count,
        name: action.payload.team,
        played: 0,
        won: 0,
        lost: 0,
        draw: 0,
        points: 0,
      };
      const warning = "The team currently exists";
      const existingTeam = state.teams.find((team) => {
        return team.name.toLowerCase() === newTeam.name.toLowerCase();
      });
      if (!existingTeam) {
        state.teams.push(newTeam);
        state.count += 1;

        for (let j = 0; j < state.count; j++) {
          if (j !== state.teams.indexOf(newTeam)) {
            const pairing = {
              player1: state.teams[j],
              player2: newTeam,
              score: [0, 0]
            };
            const existingPairing = state.pairings.find((team) => {
              return JSON.stringify(team) === JSON.stringify(pairing);
            });
            if (!existingPairing) {
              state.pairings.push(pairing);
            }
          }
        }
      } else {
        alert(warning);
      }
    },
    addScore: {
        
    }
  },
});

export const { addTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
