
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorMode: 'light', 
};

const colorModeSlice = createSlice({
  name: 'colorMode',
  initialState,
  reducers: {
    setColorMode: (state, action) => {
      state.colorMode = action.payload;
    },
  },
});

export const { setColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
