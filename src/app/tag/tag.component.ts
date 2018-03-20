import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

	feed: Feed;
	tag: string;
	
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
  		data => this.feed = {...data});
  }

  goBack() {
  	this.location.back();
  }

  getTag() {
  	this.tag = this.route.snapshot.paramMap.get('tag');
  }
}
