import express from 'express';
import newsRouter from './routes/news';
import cors from 'cors';
import commentsRouter from './routes/comments';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})