import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private feedService: FeedService
  ) { }

  ngOnInit() {
    this.storageService.setItem('showNavbar','true');
    this.storageService.setItem('currentSection','');
  }

  onClick(name: string) {
    this.feedService.feedList.map( element => element.Name == name ? (element.Selected = !element.Selected, localStorage.setItem(element.Name, element.Selected)) : {})
  }

}
