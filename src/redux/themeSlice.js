// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // Valeur initiale par défaut : 'light' ou 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // Inverse le thème actuel
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

// Exporter l'action de changement de thème
export const { toggleTheme } = themeSlice.actions;

// Exporter le reducer pour l'ajouter dans le store
export default themeSlice.reducer;
