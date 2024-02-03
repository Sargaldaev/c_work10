import express from 'express';
import {INewsCreate} from '../type';
import fileDb from '../file.db';
import {imagesUpload} from '../multer';

const newsRouter = express.Router();

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({'error': 'title and description required'});
    }

    const news: INewsCreate = {
      title: req.body.title,
      description: req.body.description || null,
      image: req.file ? 'images/' + req.file.filename : null,
    };

    const savedCategory = await fileDb.addItemNews(news);

    res.send(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

newsRouter.get('/', async (req, res) => {
  try {
    const news = await fileDb.getItems('news');
    res.send(news);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

newsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const news = await fileDb.getItems('news', id);

    const newsId = news.find(item => item.id === id);

    if (!newsId) {
      return res.status(404).send('Not Found');
    }
    res.send(newsId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

newsRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const news = await fileDb.deleteItem('news', id);

    if (!news) {
      return res.status(404).send('Not Found');
    }
    res.send(news);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default newsRouter;
