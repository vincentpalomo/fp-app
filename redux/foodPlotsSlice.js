import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plots: [],
  selectedPlot: null,
  isLoading: false,
  error: null,
};

const foodPlotsSlice = createSlice({
  name: 'foodPlots',
  initialState,
  reducers: {
    addFoodPlot: (state, action) => {
      state.plots.push(action.payload);
    },
    updateFoodPlot: (state, action) => {
      const index = state.plots.findIndex(plot => plot.id === action.payload.id);
      if (index !== -1) {
        state.plots[index] = action.payload;
      }
    },
    deleteFoodPlot: (state, action) => {
      state.plots = state.plots.filter(plot => plot.id !== action.payload);
    },
    setSelectedPlot: (state, action) => {
      state.selectedPlot = action.payload;
    },
  },
});

export const { addFoodPlot, updateFoodPlot, deleteFoodPlot, setSelectedPlot } = foodPlotsSlice.actions;
export default foodPlotsSlice.reducer;
