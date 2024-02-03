import express from 'express';
import {imagesUpload} from '../multer';
import {OkPacketParams} from 'mysql2';
import {INews} from '../type';
import mysqlDb from '../MySqlDB';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();

  try {
    const result = await connection.query('SELECT id, title, image, datetime FROM news');
    const news = result[0] as INews[];

    res.send(news);
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

newsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();

  try {
    const result = await connection.query(
      'SELECT * FROM news WHERE id = ?',
      [req.params.id]
    );

    const news = result[0] as INews[];

    if (!news[0]) {
      res.status(404).send({error: 'Not Found!'});
      return;
    }

    res.send(news[0]);
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({error: 'title and description required'});
    }

    const newsItem: Omit<INews, 'id'> = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? 'images/' + req.file.filename : ''
    };

    const connection = mysqlDb.getConnection();

    const result = await connection.query(
      'INSERT INTO news (title, description, image) VALUES (?, ?, ?)',
      [newsItem.title, newsItem.description, newsItem.image]
    );

    const info = result[0] as OkPacketParams;

    res.send({
      id: info.insertId,
      ...newsItem
    });
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

newsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();

  try {
    await connection.query(
      'DELETE FROM news WHERE id = ?',
      [req.params.id]
    );

    res.send('OK');
  } catch (error) {
    res.status(404).send({error: 'Not Found!'});
  }
});

export default newsRouter;
