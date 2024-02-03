import express from 'express';
import cors from 'cors';
import fileDb from './file.db';
import newsRouter from './routers/news';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/news',newsRouter)
app.use('/comments',commentsRouter)

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`server running in ${port} port`);
  });
};

run().catch(e => console.error(e));