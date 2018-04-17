import { Component, OnInit } from '@angular/core';
import { ArticleInterface, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../article';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  id: number;
  article = new Article();
  article_json: ArticleInterface;
  current_image: number;
  feed_name: string;

  constructor(
    public feedService: FeedService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getID();
    this.getName();
    this.getArticle();
    this.current_image = 0;
  }

  getID() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  getArticle() {
    this.feedService.getArticle(this.id, this.feed_name).subscribe(
      (data) => this.article_json = data,
      (err) => console.log("Error occurred during initialization of Gallery Component: "+ err),
      () => this.getImages()
    );
  }

  getName() {
    this.feed_name = this.route.snapshot.paramMap.get("name");
  }

  getImages() {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = this.article_json.Content;

    let images = wrapper.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      if(i != 0){
        this.article.images.push(images[i].src);
      }
    }

    let captions = wrapper.getElementsByTagName('figcaption');
    for (var i = 0; i < captions.length; i++) {
      this.article.figcaption.push(captions[i].textContent);
    }
  }

  increment()  {
    if ( this.current_image +1 > this.article.images.length-1 ){
      this.current_image = 0;
    }
    else {
      this.current_image++;
    }
  }

  decrement() {
    if ( this.current_image -1 < 0 ) {
      this.current_image = this.article.images.length -1;
    }
    else {
      this.current_image--;
    }
  }
}
