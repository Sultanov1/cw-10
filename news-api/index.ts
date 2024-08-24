import express from 'express';
import newsRouter from './routes/news';
import cors from 'cors';
import commentsRouter from './routes/comments';
import fileDb from './fileDb';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();

