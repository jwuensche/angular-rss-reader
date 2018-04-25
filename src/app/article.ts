export class Article {
  content: string[];
  title: string;
  thumbnail: string;
  figcaption: string[];
  author: string;
  link:string;
  published: string;
  images?: string[];

  constructor() {
    this.content = [];
    this.thumbnail = "";
    this.images = [];
    this.figcaption = [];
  }
}
