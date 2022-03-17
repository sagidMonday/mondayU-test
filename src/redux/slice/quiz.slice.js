import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizTimer: 15,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizTimer: (state, action) => {
      state.quizTimer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuizTimer } = quizSlice.actions;

export default quizSlice.reducer;
