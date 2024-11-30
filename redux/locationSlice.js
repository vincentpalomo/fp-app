import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLocation: null,
  lastKnownLocation: null,
  isTracking: false,
  error: null,
  locationHistory: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.lastKnownLocation = action.payload;
      state.locationHistory.push({
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    setIsTracking: (state, action) => {
      state.isTracking = action.payload;
    },
    setLocationError: (state, action) => {
      state.error = action.payload;
    },
    clearLocationHistory: (state) => {
      state.locationHistory = [];
    },
  },
});

export const {
  setCurrentLocation,
  setIsTracking,
  setLocationError,
  clearLocationHistory,
} = locationSlice.actions;

export default locationSlice.reducer;
