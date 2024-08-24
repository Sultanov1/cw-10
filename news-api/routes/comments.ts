import express from "express";
import fileDb from '../fileDb';
import {CommentsMutation} from '../types';

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
    const comments = await fileDb.getComments();

    res.send(comments);
})

commentsRouter.get("/:id", async (req, res) => {
    const comments = await fileDb.getComments();
    const comment = comments.find(m => m.id === req.params.id);

    if (!comment) {
        return res.status(404).send({error: 'Comment cannot be empty'});
    }

    res.send(comment);
})

commentsRouter.post("/", async (req, res) => {
    const {idNews, author, text} = req.body;

    if (!idNews || !text) {
        return res.status(400).send({error: 'Id must be provided'});
    }

    const newComment: CommentsMutation = {
        idNews: idNews,
        author: author,
        text: text,
    }

    try {
        const saveComment = await fileDb.addComment(newComment);
        res.send(saveComment);
    } catch (e) {
        console.error(e);
        res.status(400).send({error: 'Something went wrong'});
    }
});

commentsRouter.delete('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;

        const comments = await fileDb.getComments();
        const comment = comments.find(m => m.id === commentId);

        if (!comment) {
            return res.status(404).send({error: 'Comment cannot be empty'});
        }

        const deleteComment = await fileDb.deleteComment(commentId);
        res.send(deleteComment);
    } catch (e) {
        console.error(e);
        res.status(400).send({error: 'Id must be provided'});
    }
});

commentsRouter.get('/', async (req, res) => {
    try {
        const {new_id} = req.query;

        if (new_id) {
            const comments = await fileDb.getCommentsById(new_id.toString());
            res.send(comments);
        } else {
            const comments = await fileDb.getComments();
            res.send(comments);
        }
    } catch (e) {
        console.error(e);
        res.status(400).send({error: 'Something went wrong'});
    }
});

export default commentsRouter