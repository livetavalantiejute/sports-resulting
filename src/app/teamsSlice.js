import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    count: 0,
    teams: [],
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
      } else {
        alert(warning);
      }
    },
  },
});

export const { addTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
