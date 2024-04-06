import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationList: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setDataLocation: (state, action) => {
      state.locationList = [...action.payload.results];
    },
  },
});

export const { setDataLocation } = locationSlice.actions;

export default locationSlice.reducer;
