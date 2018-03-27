import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { DatePipe } from '@angular/common';
import * as Parser from 'rss-parser';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

	feed;
  test: string;
  images= [""];

  constructor(
  	public feedService: FeedService
  	) { }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeedfromSource().subscribe(
      data => this.test = data,
      err => console.log(err),
      () => this.testFunc()
      );
  }

  async testFunc() {
    let parser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'content_complete'],
        ]
      }
    });

    this.feed = await parser.parseString(this.test);
    var imageExp =  /<img[^>]+src="http([^">]+)/;
    var fc,fce : number;
    this.feed.items.forEach((item,index)=>{
      if(item.content_complete.match(imageExp) == null){
        this.images[index] = "";
      }
      else{
        var quick = item.content_complete.match(imageExp)[0];
        fc = quick.indexOf('src="');
        this.images[index] = quick.substring(fc+5);
        }
      });
  }
}