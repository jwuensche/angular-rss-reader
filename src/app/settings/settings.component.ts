import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  testname: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getParameters();
  }

  getParameters() {
    this.route.queryParams.subscribe( params => {
      this.testname = params["testfield"];
    },
      _ => console.log('error occurred'),
      () => localStorage.setItem('test', this.testname)
      );
  }

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }
}
