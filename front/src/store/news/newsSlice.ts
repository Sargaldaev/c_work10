import { createSlice } from '@reduxjs/toolkit';
import { INews } from '../../type';
import { deleteNews, fetchData, fetchDataById, postData } from './newsThunk.ts';

interface NewsState {
  news: INews[];
  fullNews: INews | null;
  fetchLoad: boolean;
  postLoad: boolean;
  deleteLoad: string;
  fullNewsLoad: boolean;
}

const initialState: NewsState = {
  news: [],
  fetchLoad: false,
  fullNews: null,
  postLoad: false,
  deleteLoad: '',
  fullNewsLoad: false,
};

export const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.fetchLoad = false;
      state.news = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.fetchLoad = false;
    });

    builder.addCase(fetchDataById.pending, (state) => {
      state.fullNewsLoad = true;
    });
    builder.addCase(fetchDataById.fulfilled, (state, action) => {
      state.fullNewsLoad = false;
      state.fullNews = action.payload || null;
    });
    builder.addCase(fetchDataById.rejected, (state) => {
      state.fullNewsLoad = false;
    });

    builder.addCase(postData.pending, (state) => {
      state.postLoad = true;
    });
    builder.addCase(postData.fulfilled, (state) => {
      state.postLoad = false;
    });
    builder.addCase(postData.rejected, (state) => {
      state.postLoad = false;
    });

    builder.addCase(deleteNews.pending, (state, action) => {
      state.deleteLoad = action.meta.arg.slice(1)|| '';
    });
    builder.addCase(deleteNews.fulfilled, (state) => {
      state.deleteLoad = '';
    });
    builder.addCase(deleteNews.rejected, (state) => {
      state.deleteLoad = '';
    });
  },
});

export const NewsReducer = NewsSlice.reducer;
