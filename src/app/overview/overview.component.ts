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

  constructor(
  	public feedService: FeedService
  	) { }

  ngOnInit() {
  	this.showFeed();
  }

  showFeed() {
  	this.feedService.getFeed()
  		.subscribe( data => this.feed = {
  			...data
  		});
  }
}