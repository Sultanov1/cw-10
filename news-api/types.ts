export interface News {
    id: string;
    title: string
    content: string;
    image: string | null;
}

export interface NewsMutation {
    title: string;
    content: string;
    image: string | null;
}

export interface Comments {
    id: string;
    idNews: string;
    author: string;
    text: string;
}

export interface CommentsMutation {
    idNews: string;
    author: string;
    text: string;
}