/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface HeaderTitleState {
  headerTitle: {
    title: string;
  };
}

export const headerTitleSlice = createSlice({
  name: 'headerTitle',
  initialState: {
    title: ''
  },
  reducers: {
    setHeaderTitle: (state, action) => {
      state.title = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setHeaderTitle } = headerTitleSlice.actions;

export default headerTitleSlice.reducer;
