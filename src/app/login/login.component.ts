import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { FeedService } from '../feed.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(
    public storageService: StorageService,
    public router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    public feedService: FeedService
  ) { }

  ngOnInit() {
    this.storageService.setItem('showNavbar', 'false');
  }

  login(user: string, password: string) {
    this.loading = true;
    this.authService.login(user,password).subscribe(result => {
      if (result) {
        this.loading = false;
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'user/home';
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: '',
          preserveFragment: true,
          queryParams: { sessionID: this.authService.token.Token }
        };
        this.feedService.getFeedList(this.authService.token.Token);
        this.router.navigate([redirect], navigationExtras);
      }
    },
    () => {},
    () => {
      this.loading = false;
      this.snackBar.open('Wrong password or user name', 'OK', {
        duration: 4000,
      });}
  );
  }

}
