import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.storageService.setItem('showNavbar', 'false');
  }

  login(user: string, password: string) {
    this.loading = true;
    this.authService.login(user,password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.loading = false;
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'user/overview/SpaceFlightNow';
        this.router.navigate([redirect]);
      }
    },
    () => {},
    () => {if(!this.authService.isLoggedIn){
      this.loading = false;
      this.snackBar.open('Wrong password or user name', 'OK', {
        duration: 4000,
      });
    }}
  );
  }

  logout() {
    this.authService.logout();
  }

}
