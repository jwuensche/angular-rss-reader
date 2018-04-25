import { Component, OnInit } from '@angular/core';
import { FeedService, FeedList } from "../feed.service";
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  feeds: FeedList;
  feedName;
  display;

  constructor(
    public feedService: FeedService,
    public storageService: StorageService
  ) {
    this.storageService.getItem('currentSection').subscribe(
      val => this.feedName = val
    );
    this.storageService.getItem('showNavbar').subscribe(
      val => this.display = val
    );
  }

  ngOnInit() {
    this.getFeedList();
  }

  getFeedList() {
    this.feedService.getFeedList().subscribe(
      data => this.feeds = data
    );
  }
}
