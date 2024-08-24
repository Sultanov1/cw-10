import express from "express";
import fileDb from '../fileDb';
import {NewsMutation} from '../types';
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
    const news = await  fileDb.getNews();

    res.send(news);
});

newsRouter.get("/:id", async (req, res) => {
    const news = await fileDb.getNews();
    const newsItem = news.find(m => m.id === req.params.id);

    res.send(newsItem);
})

newsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    const {title, content} = req.body;
    const image = req.file ? req.file.filename : null;


  if (!title || !content) {
        return res.status(422).send({error: 'Content cannot be empty'});
    }

    const newItem: NewsMutation = {
        title: title,
        content: content,
        image: image,
    }

    try  {
        const saveItem = await fileDb.addNews(newItem);
        res.send(saveItem);
    } catch (e) {
        console.error(e);
        res.status(400).send({error: 'Something went wrong'});
    }
})

newsRouter.delete('/:id', async (req, res) => {
    try {
        const newsItemId = req.params.id;

        const news = await fileDb.getNews();
        const newsItem = news.find(m => m.id === newsItemId);

        if (!newsItem) {
            return res.status(404).json({ error: 'New not found' });
        }

        const deleteNew = await fileDb.deleteNew(newsItem.id);

        res.send(deleteNew);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default newsRouter