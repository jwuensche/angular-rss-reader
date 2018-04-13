export class Article {
  content: string[];
  title: string;
  thumbnail: string;
  figcaption: string[];
  author: string;
  published: string;
  images: string[];
  teststuff: string;

  constructor() {
    this.content = [];
    this.thumbnail = "";
    this.images = [];
    this.figcaption = [];
  }
}
