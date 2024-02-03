export interface INews {
  id: string;
  title: string;
  description: string;
  image: string | null;
  datetime: string;
}

export interface IComments {
  id: string;
  newsId: string;
  author: string | null;
  description: string;
}

export interface INewsCreate {
  title: string;
  description: string;
  image: File | null;
}

export interface ICommentCreate {
  newsId?: string;
  author: string | null;
  description: string;
}
