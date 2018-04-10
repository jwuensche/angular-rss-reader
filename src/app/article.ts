export class Article {
  content: string[];
  title: string;
  thumbnail: string;
  figcaption: string;
  author: string;
  published: string;

/*put in some dummies to test functionality*/
  constructor() {
    this.content = [];
    this.title = "empty";
    this.thumbnail = "https://images.pexels.com/photos/23781/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    this.figcaption = "";
  }
}
