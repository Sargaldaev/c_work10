import express from 'express';
import {imagesUpload} from '../multer';
import {OkPacketParams} from 'mysql2';
import mysqlDb from '../MySqlDB';
import {IComments} from '../type';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();

  try {
    if (req.query.news_id) {
      const result = await connection.query('SELECT * FROM comments WHERE newsId= ?', [req.query.news_id]);
      return res.send(result[0]);
    }

    const result = await connection.query('SELECT * FROM comments');
    res.send(result[0]);
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

commentsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();

  try {
    const result = await connection.query(
      'SELECT * FROM comments WHERE id = ?',
      [req.params.id]
    );

    const comments = result[0] as IComments[];

    if (!comments[0]) {
      return res.status(404).send({error: 'Not Found!'});
    }

    res.send(comments[0]);
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

commentsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  try {
    if (!req.body.newsId || !req.body.description) {
      return res.status(400).send({error: 'newsId and description required'});
    }

    const comment: Omit<IComments, 'id'> = {
      newsId: req.body.newsId,
      author: req.body.author || 'Anonymous',
      description: req.body.description,
    };

    const connection = mysqlDb.getConnection();

    const result = await connection.query(
      'INSERT INTO comments (newsId, author, description) VALUES (?, ?, ?)',
      [comment.newsId, comment.author, comment.description]
    );

    const info = result[0] as OkPacketParams;

    res.send({
      id: info.insertId,
      ...comment
    });
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();

  try {
    await connection.query(
      'DELETE FROM comments WHERE id = ?',
      [req.params.id]
    );

    res.send('OK');
  } catch (error) {
    res.status(404).send({error: 'Not Found!'});
  }
});

export default commentsRouter;
