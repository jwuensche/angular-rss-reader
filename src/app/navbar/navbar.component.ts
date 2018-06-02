import { Component, OnInit } from '@angular/core';
import { FeedService, FeedList } from "../feed.service";
import { StorageService } from "../storage.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  feedName;
  display;

  constructor(
    public feedService: FeedService,
    public storageService: StorageService,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService
  ) {
    this.storageService.getItem('currentSection').subscribe(
      val => this.feedName = val
    );
    this.storageService.getItem('showNavbar').subscribe(
      val => this.display = val
    );
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout(this.authService.token.Token).subscribe(
      () => {},
      () => this.snackBar.open('Logout failed. Try again or close the window to be automatically logged off in 30 minutes.', 'OK', {duration: 5000}),
      () => this.router.navigate(['/login'])
    );
  }
}
