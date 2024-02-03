import { createAsyncThunk } from '@reduxjs/toolkit';
import { INews, INewsCreate } from '../../type';
import axiosApi from '../../axiosApi.ts';

export const fetchData = createAsyncThunk<INews[]>(
  'news/fetchData',
  async () => {
    const {data} = await axiosApi.get<INews[]>('/news');

    return data;
  },
);

export const fetchDataById = createAsyncThunk<INews, string>(
  'news/fetchDataById',
  async (id) => {
    const {data} = await axiosApi.get<INews>(`/news/${id}`);

    return data;
  },
);

export const postData = createAsyncThunk<void, INewsCreate>(
  'news/postData',
  async (arg) => {
    const formData = new FormData();

    const keys = Object.keys(arg) as (keyof INewsCreate)[];
    keys.forEach((key) => {
      const value = arg[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/news', formData);
  },
);

export const deleteNews = createAsyncThunk<void, string>(
  'news/deleteNews',
  async (id) => {
    await axiosApi.delete(`/news/${id}`);
  },
);
