import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export class Article {
  content: string[];
  title: string;
  thumbnail: string;
  figcaption: string;
  author: string;
  pubDate: string;

/*put in some dummies to test functionality*/
  constructor() {
    this.content = [];
    this.title = "empty";
    this.thumbnail = "https://images.pexels.com/photos/23781/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    this.figcaption = "SpaceXs Dragon Craft, we're not sure what you were looking for.";

  }
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	feed: Feed;
	id: number;
  article = new Article();
	
  constructor(
  	public feedService: FeedService,
  	private location: Location,
    private route: ActivatedRoute
  	) { }

  ngOnInit() {
  	this.getFeed();
  	this.getId();
  }

  getFeed() {
  	this.feedService.getFeed().subscribe(
  		data => this.feed = {...data},
      err => alert('Error' + err ),
      () => this.getArticle());
  }

  putDummy() {
    this.article.content.push('test');
    this.article.title = 'test';
    this.article.thumbnail = 'test.png';
    this.article.figcaption = 'something';
  }

  goBack() {
  	this.location.back();
  }

  getId() {
  	this.id= +this.route.snapshot.paramMap.get('id');
  }

  getArticle() {
    /*First catch everything already extracted*/
    this.article.title = this.feed.items[this.id].title;
    this.article.thumbnail = this.feed.items[this.id].thumbnail;
    this.article.author =this.feed.items[this.id].author;
    this.article.pubDate = this.feed.items[this.id].pubDate;
    /*Now figure description, a bit of pain but works for now*/
    var figcaption = /(figcaption)[^<]+(<)/;
    this.article.figcaption = this.feed.items[this.id].content.match(figcaption);
    var fc = this.article.figcaption[0].indexOf('>');
    var fce = this.article.figcaption[0].indexOf('<',fc + 1);
    this.article.figcaption = this.article.figcaption[0].substring(fc+1, fce);
    /*Following the actual content of chosen article*/
    var content = /(<p)[^<]+(<)/gi;
    var p_substr = this.feed.items[this.id].content.match(content);
    p_substr.forEach((item,index)=>{
      fc = item.indexOf('>');
      fce = item.indexOf('<',fc+1);
      this.article.content[index] = item.substring(fc+1,fce);
    });
  }
}