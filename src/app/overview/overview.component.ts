import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import {ActivatedRoute} from "@angular/router";
import { StorageService } from "../storage.service";
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';

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
    public storageService: StorageService,
    public authService: AuthService,
    private route: ActivatedRoute
  	) {
    route.params.subscribe(val => {
      this.getParameters();
      this.getFeed();
    });
  }

  ngOnInit() {
    this.storageService.setItem('showNavbar', 'true');
    this.getParameters();
    if (this.feedName){
      this.getFeed();
    }
  }

  getFeed() {
    this.storageService.setItem('currentSection', this.feedName);
    this.feedService.getFeed(this.feedName, this.authService.token.Token).subscribe(
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
    if(this.feedName){
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
}
