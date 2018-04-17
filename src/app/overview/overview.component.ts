import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import {ActivatedRoute} from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

	feed: Feed;
  images= [""];
  feedName: string;

  constructor(
  	public feedService: FeedService,
    private route: ActivatedRoute
  	) {
    route.params.subscribe(val => {
      this.getParameters();
      this.getFeed();
    });
  }

  ngOnInit() {
    this.getParameters();
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed(this.feedName).subscribe(
      data => this.feed = data,
      err => console.log(err),
      () => this.getImages()
      );
  }

  getParameters() {
    this.feedName = this.route.snapshot.paramMap.get("name");
  }

  async getImages() {
    this.images = [];
    let wrapper = document.createElement("div")
    this.feed.Items.forEach((item,index)=>{
      wrapper.innerHTML = item.Content;
      try{
      this.images[index] = wrapper.getElementsByTagName("img")[0].src;
      } catch {
        console.log("some error occurred")
      }
    });
  }
}
