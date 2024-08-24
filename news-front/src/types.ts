export interface News {
  id: string;
  title: string;
  content: string;
  image: string | null;
  dateTime: string;
}

export interface NewsMutation {
  title: string;
  content: string;
  image: string | null;
  dateTime: string;
}

export interface NewsId{
  [key: string]: News;
}