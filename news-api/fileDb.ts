import {promises as fs} from 'fs';
import {Comments, CommentsMutation, News, NewsMutation} from './types';
import crypto from 'crypto';
import dayjs from "dayjs";


const fileName = './db.json';

let data = {
  news: [] as News[],
  comments: [] as Comments[],
};

type ItemID = News | Comments ;

const addItem = async (array: ItemID[], item: NewsMutation | CommentsMutation) => {
  const id = crypto.randomUUID();
  let dateTime: string | undefined;

  if ('title' in item) {
    dateTime = dayjs().toISOString();
  }

  const newItem = {id, dateTime, ...item};
  array.push(newItem);
  await fileDb.save();
  return newItem;
};

const deleteItem = async (array: ItemID[], id: string) => {
  try {
    const updatedItems = array.filter(existingItem => existingItem.id !== id);

    if (updatedItems.length === array.length) {
      console.error('Item not found');
    } else {
      if (array === data.news) {
        const commentsToDelete = data.comments.filter(comment => comment.idNews === id);
        data.comments = data.comments.filter(comment => comment.idNews !== id);

        if (commentsToDelete.length > 0) {
          console.log(`Deleted ${commentsToDelete.length} comments associated with the news.`);
        }

        data.news = updatedItems as News[];
      } else if (array === data.comments) {
        data.comments = updatedItems as Comments[];
      }

      await fileDb.save();
    }

    return updatedItems;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};


const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = {
        news: [],
        comments: [],
      };
    }
  },
  async getNews() {
    return data.news;
  },
  async getComments() {
    return data.comments;
  },
  async addNews(item: NewsMutation) {
    return addItem.call(this, data.news, item);
  },
  async addComment(item: CommentsMutation) {
    return addItem.call(this, data.comments, item);
  },
  async deleteNew(id: string) {
    return deleteItem(data.news, id);
  },
  async deleteComment(id: string) {
    return deleteItem(data.comments, id);
  },
  async getCommentsById(news_id: string) {
    try {
      const allComments = await this.getComments();
      return allComments.filter(comment => comment.idNews === news_id);
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  },
  async save() {
    const dataToSave = {
      news: data.news,
      comments: data.comments,
    };
    return fs.writeFile(fileName, JSON.stringify(dataToSave, null, 2));
  }
};

export default fileDb;