import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {News, NewsId, NewsMutation} from '../../types';

export const fetchNews = createAsyncThunk<News[]>('news/fetch', async () => {
    const {data: items} = await axiosApi.get<NewsId | null>('/news');
    const newsResponse = items;
    let news: News[] = [];

    if (newsResponse) {
      news = Object.values(newsResponse).map((newsItem) =>({
        ...newsItem,
        id: newsItem.id
      }));
    }

    return news;
  });

export const createNews = createAsyncThunk<void, NewsMutation>(
  'news/create',
  async (news) => {
    try {
      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('content', news.content);

      if(news.image) {
        formData.append('image', news.image);
      }

      await axiosApi.post('/news', formData);
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }
);


export const deleteNews = createAsyncThunk<void, string>(
  'news/delete',
  async (newsId) => {
    await axiosApi.delete(`/news/${newsId}`);
  }
);

export const fetchSingleNews = createAsyncThunk<News, string>(
  'news/fetchSingle',
  async (newsId) => {
    try {
      const {data: items} = await axiosApi.get<News>(`/news/${newsId}`);
      return items;
    } catch (error) {
      console.error('Error fetching single news:', error);
      throw error;
    }
  }
);