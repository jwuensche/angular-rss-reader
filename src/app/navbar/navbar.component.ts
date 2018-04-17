import { Component, OnInit } from '@angular/core';
import { FeedService, FeedList } from "../feed.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  feeds: FeedList;

  constructor(
    public feedService: FeedService
  ) { }

  ngOnInit() {
    this.getFeedList()
  }

  getFeedList() {
    this.feedService.getFeedList().subscribe(
      data => this.feeds = data
    );
  }
}
