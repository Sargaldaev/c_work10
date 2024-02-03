import { createSlice } from '@reduxjs/toolkit';
import { IComments } from '../../type';
import {
  deleteComment,
  fetchDataComments,
  postDataComments,
} from './commentsThunk.ts';

interface CommentsState {
  comments: IComments[];
  fetchLoad: boolean;
  postLoad: boolean;
  deleteLoad: string;
}

const initialState: CommentsState = {
  comments: [],
  fetchLoad: false,
  postLoad: false,
  deleteLoad: '',
};

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataComments.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataComments.fulfilled, (state, action) => {
      state.fetchLoad = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchDataComments.rejected, (state) => {
      state.fetchLoad = false;
    });

    builder.addCase(postDataComments.pending, (state) => {
      state.postLoad = true;
    });
    builder.addCase(postDataComments.fulfilled, (state) => {
      state.postLoad = false;
    });
    builder.addCase(postDataComments.rejected, (state) => {
      state.postLoad = false;
    });

    builder.addCase(deleteComment.pending, (state, action) => {
      state.deleteLoad = action.meta.arg.slice(1) || '';
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.deleteLoad = '';
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.deleteLoad = '';
    });
  },
});

export const CommentsReducer = CommentsSlice.reducer;
