/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../models/Character';

export interface CharactersDialogState {
  title: string;
  open: boolean;
  characters: Character[];
}

const initialState: CharactersDialogState = {
  title: '',
  open: false,
  characters: []
};

export const charactersDialogSlice = createSlice({
  name: 'charactersDialog',
  initialState,
  reducers: {
    setDialogTitle: (state: CharactersDialogState, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDialogOpen: (state: CharactersDialogState, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setDialogCharacters: (state: CharactersDialogState, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setDialogTitle, setDialogOpen, setDialogCharacters } = charactersDialogSlice.actions;

export default charactersDialogSlice.reducer;
