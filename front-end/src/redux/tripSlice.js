import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  days: "",
  user: "",
  items: [
    {
      day: "",
      locations: [
        {
          id: "",
          name: "",
          address: "",
          url: "",
          day: "",
          latitude: "",
          longitude: "",
          category: "",
        },
      ],
    },
  ],
  day: "",
  active: false,
  isDuplicate: false,
  index: "",
  markerList: [],
  tempLocations: [],
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripDatabyAI: (state, action) => {
      state.items = [...action.payload];
      state.markerList = [];
    },
    setTripData: (state, action) => {
      state.name = action.payload.name;
      state.days = action.payload.days;
      state.user = action.payload.user;
      state.items = [...action.payload.items];
      state.markerList = [];
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
    setLocationItem: (state, action) => {
      // Tripcreate
      const location = action.payload;
      const day = location.day;
      const findDay = state.items.find((item) => item.day === day);

      // findDay && findDay.locations.push(location)
      if (findDay) {
        if (findDay.locations.find((item) => item.id == location.id)) {
          state.isDuplicate = true;
          console.log("Duplicate", state.isDuplicate);
        } else {
          state.isDuplicate = false;
          console.log("Not duplicate", state.isDuplicate);
          findDay.locations.push(location);
        }
      }
      // return { ...state };
    },
    deleteLocationItem: (state, action) => {
      const location = action.payload;
      const id = location.id;
      const day = location.day;

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.day === day) {
            const updatedLocations = item.locations.filter(
              (loc) => loc.id !== id,
            );
            return {
              ...item,
              locations: updatedLocations,
            };
          } else {
            return item;
          }
        }),
      };
    },
    updatedLocationOrder: (state, action) => {
      const updatedLocations = action.payload;
      const day = updatedLocations[0].day;

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.day === day) {
            return {
              ...item,
              locations: updatedLocations,
            };
          } else {
            return item;
          }
        }),
      };
    },
    activeButton: (state, action) => {
      state.active = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    getLocationArray: (state, action) => {
      const day = action.payload;
      const findDay = state.items.find((item) => item.day === day);
      if (findDay) {
        state.markerList = [...findDay.locations];
      }
    },
    storeTempLocations: (state, action) => {
      state.tempLocations = [...action.payload];
    },
  },
});

export const {
  setTripData,
  setLocationItem,
  setDay,
  deleteLocationItem,
  updatedLocationOrder,
  activeButton,
  setIndex,
  getLocationArray,
  storeTempLocations,
  setTripDatabyAI,
} = tripSlice.actions;

export default tripSlice.reducer;
