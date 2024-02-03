import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommentCreate, IComments } from "../../type";
import axiosApi from "../../axiosApi.ts";
import { RootState } from "../../app/store.ts";

export const fetchDataComments = createAsyncThunk<IComments[], string>(
  "comments/fetchDataComments",
  async (id) => {
    const { data } = await axiosApi.get<IComments[]>(
      `/comments/?news_id=${id}`,
    );

    return data;
  },
);

export const fetchDataCommentsById = createAsyncThunk<IComments>(
  "comments/fetchDataCommentsById",
  async () => {
    const { data } = await axiosApi.get<IComments>(`/comments}`);

    return data;
  },
);

export const postDataComments = createAsyncThunk<
  void,
  ICommentCreate,
  { state: RootState }
>("comments/postDataComments", async (arg, state) => {
  const comment = {
    ...arg,
    newsId: state.getState().news.fullNews?.id,
  };

  await axiosApi.post("/comments", comment);
});

export const deleteComment = createAsyncThunk<void, string>(
  "comments/deleteComment",
  async (id) => {
    await axiosApi.delete(`/comments/${id}`);
  },
);
