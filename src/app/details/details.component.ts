import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	feed: Feed;
	id: number;
	
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
  		data => this.feed = {...data});
  }

  goBack() {
  	this.location.back();
  }

  getId() {
  	this.id= +this.route.snapshot.paramMap.get('id');
  }
}
