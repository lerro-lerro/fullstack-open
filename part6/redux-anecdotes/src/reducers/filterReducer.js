import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: "",
  importance: "ALL"
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTextFilter(state, action) {
      state.text = action.payload;
    },
    setImportanceFilter(state, action) {
      state.importance = action.payload;
    }
  }
});

export const { setTextFilter, setImportanceFilter } = filterSlice.actions;
export default filterSlice.reducer;
