import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  markers: [],
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    addMarker: (state, action) => {
      state.markers.push(action.payload);
    },
    updateMarker: (state, action) => {
      const index = state.markers.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.markers[index] = action.payload;
      }
    },
    deleteMarker: (state, action) => {
      state.markers = state.markers.filter(m => m.id !== action.payload);
    },
  },
});

export const { addMarker, updateMarker, deleteMarker } = markersSlice.actions;
export default markersSlice.reducer;
