import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as Parser from 'rss-parser';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

	feed: Feed;
  cat: string;
	feedXml: string;
  images = [""];

  constructor(
  public feedService: FeedService,
	private location: Location,
	private route: ActivatedRoute
  	) { }

  ngOnInit() {
  	this.getFeed();
  	this.getTag();
  }

  getFeed() {
    this.feedService.getFeed().subscribe(
      data => this.feed = data,
      err => console.log('Error' + err),
      () => this.testFunc()
      )
  }

  goBack() {
  	this.location.back();
  }

  getTag() {
  	this.cat = this.route.snapshot.paramMap.get('tag');
  }

  async testFunc() {
    var imageExp = /<img[^>]+src="http([^">]+)/;
    var fc,fce : number;
    this.feed.items.forEach((item,index)=>{
      if(item.content.match(imageExp) == null){
        this.images[index] = "";
      }
      else{
        var quick = item.content.match(imageExp)[0];
        fc = quick.indexOf('src="');
        this.images[index] = quick.substring(fc+5);
        }
      });
  }
}
