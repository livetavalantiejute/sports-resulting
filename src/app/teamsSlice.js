import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "teams",
  initialState: [],
  reducers: {
    addTeam: (state, action) => {
      const newTeam = {
        id: state.length + 1,
        name: action.payload.team,
      };
      const warning = "The team currently exists"
      const existingTeam = state.find((team) => {
        return team.name.toLowerCase() === newTeam.name.toLowerCase()
      })
      if (!existingTeam) {
        state.push(newTeam)
      } else {
        alert(warning)
      }
    },
  },
});

export const { addTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
