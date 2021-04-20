/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderTitleState {
  title: string;
}

const initialState: HeaderTitleState = {
  title: ''
};
export const headerTitleSlice = createSlice({
  name: 'headerTitle',
  initialState,
  reducers: {
    setHeaderTitle: (state: HeaderTitleState, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setHeaderTitle } = headerTitleSlice.actions;

export default headerTitleSlice.reducer;
