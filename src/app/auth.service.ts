import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(user: string, password: string): Observable<boolean> {
    // return Observable.of(true).delay(1000).do(() => this.isLoggedIn = true);
    if(user=='fred' && password=='test')
      return Observable.of(true).delay(1000).do(() => this.isLoggedIn = true);
    else
      return Observable.of(false).delay(1000).do(() => this.isLoggedIn = false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
