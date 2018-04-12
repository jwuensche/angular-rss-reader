import { Component, OnInit } from '@angular/core';
import { Feed, ArticleInterface, FeedService } from '../feed.service';
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

  constructor(
  	public feedService: FeedService,
  	private location: Location,
    private route: ActivatedRoute
  	) { }

  ngOnInit() {
    this.getId();
  	this.getFeed();
  }

  getFeed() {
  	this.feedService.getArticle(this.id).subscribe(
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
    var element = wrapper.getElementsByTagName('figcaption');
    var text = element[0].innerText || element[0].textContent;
    this.article.figcaption = text;

    /*Following the actual content of chosen article*/
    let p_substr = wrapper.getElementsByTagName('p');
    for (var i = 0; i < p_substr.length; i++) {
      this.article.content.push(p_substr[i].textContent);
    }
  }

  getImage() {
    var imageExp = /<img[^>]+src="http([^">]+)/;
    var fc: number;
    var quick = this.article_json.Content.match(imageExp);
    fc = quick[0].indexOf('src="');
    this.article.thumbnail = quick[0].substring(fc+5);
  }
}
