export class Article {
  content: string[];
  title: string;
  thumbnail: string;
  figcaption: string[];
  author: string;
  published: string;
  images: string[];

  constructor() {
    this.content = [];
    this.title = "";
    this.thumbnail = "";
    this.images = [];
    this.figcaption = [];
  }
}
