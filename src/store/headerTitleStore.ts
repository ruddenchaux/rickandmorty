/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const headerTitleSlice = createSlice({
  name: 'headerTitle',
  initialState: {
    title: ''
  },
  reducers: {
    set: (state, action) => {
      state.title = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { set } = headerTitleSlice.actions;

export default headerTitleSlice.reducer;
