import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StorageService} from "../storage.service";
import { FeedService, FeedList } from "../feed.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private feedService: FeedService,
    public storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.setItem('showNavbar','true');
    this.storageService.setItem('currentSection', '');
  }

  onChange(name: string) {
    this.feedService.feedList.forEach(element => {
      //Setting changes into localStorage so that future session can use settings too
      element.Name == name ? (element.Selected = !element.Selected, localStorage.setItem(element.Name, element.Selected)) : {}
    });
  }
}
