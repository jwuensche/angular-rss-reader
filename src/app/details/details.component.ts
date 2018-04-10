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

    /*Now figure description, a bit of pain but works for now*/
    var figcaption = /(figcaption)[^<]+(<)/;

    if(this.article_json.Content.match(figcaption) !== null){
      this.article.figcaption = this.article_json.Content.match(figcaption)[0];
      var fc = this.article.figcaption.indexOf('>');
      var fce = this.article.figcaption.indexOf('<',fc + 1);
      this.article.figcaption = this.article.figcaption.substring(fc+1, fce);
    }

    /*Following the actual content of chosen article*/
    var content = /(<p)[^<]+(<)/gui;
    var p_substr = this.article_json.Content.match(content);
    p_substr.forEach((item,index)=>{
      fc = item.indexOf('>');
      fce = item.indexOf('<',fc+1);
      this.article.content[index] = item.substring(fc+1,fce);
    });
  }

  getImage() {
    var imageExp = /<img[^>]+src="http([^">]+)/;
    var fc: number;
    var quick = this.article_json.Content.match(imageExp);
    fc = quick[0].indexOf('src="');
    this.article.thumbnail = quick[0].substring(fc+5);
  }
}
