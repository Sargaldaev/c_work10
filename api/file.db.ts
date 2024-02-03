import {promises as fs} from 'fs';
import {randomUUID} from 'crypto';
import {ICommentCreate, IComments, INews, INewsCreate} from './type';

const filename = './db.json';
let data: {
  news: INews[];
  comments: IComments[];
} = {
  news: [],
  comments: [],
};

const fileDb = {

  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = {
        news: [],
        comments: [],
      };
    }
  },

  async getItemsById(key: 'comments', id: string) {

    return data[key].find(item => item.newsId === id);

  },

  async getItemsByNews(key: 'comments', id: string) {

    const news: IComments[] = [];

    data[key].forEach(item => {
      if (item.newsId === id) {
        news.push(item);
      }
    });

    return news;
  },


  async getItems(key: keyof typeof data, id?: string) {

    if (key === 'news') {
      if (!id) {
        return data[key].map(item => ({
          title: item.title,
          image: item.image,
          datetime: item.datetime,
          id: item.id,
        }));
      } else {
        return data[key];
      }
    }
    return data[key];
  },

  async addItemNews(item: INewsCreate) {

    const newItem = {
      ...item,
      id: randomUUID(),
      datetime: new Date().toISOString()
    };

    data.news.push(newItem);
    await this.save();

    return newItem;

  },

  async addItemComments(item: ICommentCreate) {

    if (!item.author) {
      item.author = 'Anonymous';
    }

    const run = data.news.find(value => value.id === item.newsId);

    if (run) {
      const newItem = {
        ...item,
        id: randomUUID(),
      };

      data.comments.push(newItem);
      await this.save();

      return newItem;
    }

    return 'news id not found';

  },


  async deleteItem(key: keyof typeof data, id: string) {
    const index = data[key].findIndex(item => item.id === id);

    if (index !== -1) {
      data[key].splice(index, 1);
      await this.save();
    }

    let itemId = await this.getItemsByNews('comments', id);

    if (itemId) {
      itemId.forEach(comment => {
        const commentIndex = data.comments.findIndex(item => item.id === comment.id);
        if (commentIndex !== -1) {
          data.comments.splice(commentIndex, 1);
        }
      });

      await this.save();
    }

    return 'deleted';
  },
  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  }
};
export default fileDb;