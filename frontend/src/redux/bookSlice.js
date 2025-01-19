import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    singlebook: {},
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSingleBook: (state, action) => {
      state.singlebook = action.payload;
    },
  },
});
export default bookSlice.reducer;
export const { setBooks,setSingleBook } = bookSlice.actions;
