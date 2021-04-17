/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../models/Character';

export interface CharactersDialogState {
  charactersDialog: {
    title: string;
    open: boolean;
    characters: Character[];
  };
}

export const charactersDialogSlice = createSlice({
  name: 'charactersDialog',
  initialState: {
    title: '',
    open: false,
    characters: [] as Character[]
  },
  reducers: {
    setDialogTitle: (state, action) => {
      state.title = action.payload;
    },
    setDialogOpen: (state, action) => {
      state.open = action.payload;
    },
    setDialogCharacters: (state, action) => {
      state.characters = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setDialogTitle, setDialogOpen, setDialogCharacters } = charactersDialogSlice.actions;

export default charactersDialogSlice.reducer;
