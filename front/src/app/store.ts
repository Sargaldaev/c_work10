import { configureStore } from '@reduxjs/toolkit';
import { NewsReducer } from '../store/news/newsSlice.ts';
import { CommentsReducer } from '../store/comments/commentsSlice.ts';

export const store = configureStore({
  reducer: {
    news: NewsReducer,
    comments: CommentsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
