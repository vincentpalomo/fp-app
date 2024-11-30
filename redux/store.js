import { configureStore } from '@reduxjs/toolkit';
import foodPlotsReducer from './foodPlotsSlice';
import locationReducer from './locationSlice';
import markersReducer from './markersSlice';

export const store = configureStore({
  reducer: {
    foodPlots: foodPlotsReducer,
    location: locationReducer,
    markers: markersReducer,
  },
});
