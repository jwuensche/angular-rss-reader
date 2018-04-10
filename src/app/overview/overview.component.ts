import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

	feed: Feed;
  images= [""];

  constructor(
  	public feedService: FeedService
  	) { }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed().subscribe(
      data => this.feed = data,
      err => console.log(err),
      () => this.testFunc()
      );
  }

  async testFunc() {
    var imageExp =  /<img[^>]+src="http([^">]+)/;
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
