import { Component, OnInit } from '@angular/core';
import { Feed, FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

	feed: Feed;
  cat: string;
  feedName: string;
  images = [""];

  constructor(
  public feedService: FeedService,
	public storageService: StorageService,
	private location: Location,
	private route: ActivatedRoute
  	) { }

  ngOnInit() {
  	debugger
    this.getTag();
    this.getName();
    this.getFeed();
    this.storageService.setItem('showNavbar', 'true');
  }

  getFeed() {
    this.feedService.getFeed(this.feedName).subscribe(
      data => this.feed = data,
      err => console.log('Error' + err),
      () => this.getImages()
      )
  }

  goBack() {
  	this.location.back();
  }

  getTag() {
  	this.cat = this.route.snapshot.paramMap.get('tag');
  }

  getName() {
    this.feedName = this.route.snapshot.paramMap.get("name");
    this.storageService.setItem('currentSection', this.feedName);
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
