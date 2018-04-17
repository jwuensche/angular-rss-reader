import { Component, OnInit } from '@angular/core';
import { ArticleInterface, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../article';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	article_json: ArticleInterface;
	id: number;
  article = new Article();
  feed_name: string;

  constructor(
  	public feedService: FeedService,
  	private location: Location,
    private route: ActivatedRoute
  	) { }

  ngOnInit() {
    this.getId();
    this.getName();
  	this.getFeed();
  }

  getFeed() {
  	this.feedService.getArticle(this.id,this.feed_name).subscribe(
  		data => this.article_json = data,
      err => console.log('Error' + err ),
      () => this.getArticle());
  }

  goBack() {
  	this.location.back();
  }

  getId() {
  	this.id= +this.route.snapshot.paramMap.get('id');
  }

  getName() {
    this.feed_name = this.route.snapshot.paramMap.get("name");
  }

  async getArticle() {
    /*First catch everything already extracted*/
    this.article.title = this.article_json.Title;
    this.getImage();
    this.article.author =this.article_json.Author.Name;
    this.article.published = this.article_json.PublishedParsed;


    /*Creating a wrapper around catched string to get access to js DOM methods*/
    let wrapper= document.createElement('div');
    wrapper.innerHTML= this.article_json.Content;

    /*Get Main image description by using wrapper*/
    var captions = wrapper.getElementsByTagName('figcaption');
    for (var i = 0; i < captions.length; i++) {
      this.article.figcaption.push(captions[i].textContent);
    }

    /*Following the actual content of chosen article*/
    let p_substr = wrapper.getElementsByTagName('p');
    for (var i = 0; i < p_substr.length; i++) {
      this.article.content.push(p_substr[i].textContent);
    }
  }

  getImage() {
    /*again creating a wrapper to use dom methods*/
    let wrapper= document.createElement('div');
    wrapper.innerHTML= this.article_json.Content;

    /*get img src for every used img*/
    let imagesrc = wrapper.getElementsByTagName('img');
    for (var i = 0; i < imagesrc.length; i++) {
      this.article.images.push(imagesrc[i].src);
    }
    this.article.thumbnail = this.article.images[0];
  }
}
