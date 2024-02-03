import express from 'express';
import {ICommentCreate} from '../type';
import fileDb from '../file.db';

const commentsRouter = express.Router();


commentsRouter.post('/', async (req, res) => {

  if (!req.body.newsId || !req.body.description) {
    return res.status(400).send({'error': 'News id and description required'});
  }

  const comment: ICommentCreate = {
    newsId: req.body.newsId,
    author: req.body.author || null,
    description: req.body.description
  };

  const savedComm = await fileDb.addItemComments(comment);

  res.send(savedComm);
});


commentsRouter.get('/', async (req, res) => {
  const comments = await fileDb.getItems('comments');

  if (req.query.news_id) {
    const newsId = req.query.news_id as string;

    const comments = await fileDb.getItemsByNews('comments', newsId);

    if (!comments) {
      return res.status(404).send('Not Found');
    }
    return res.send(comments);

  }
  res.send(comments);
});

commentsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const comment = await fileDb.getItems('comments', id);

  const commentId = comment.find(item => item.id === id);

  if (!commentId) {
    return res.status(404).send('Not Found');
  }
  res.send(commentId);
});


commentsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await fileDb.deleteItem('comments', id);


  if (!comment) {
    return res.status(404).send('Not Found');
  }
  res.send(comment);
});

export default commentsRouter;