import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export interface Token {
    Token: string;
}

@Injectable()
export class AuthService {
  isLoggedIn = false;
  token = {} as Token;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (
    private http : HttpClient,
    private cookieService: CookieService
  ){}

  authServerUrl ="http://localhost:9000/auth"
  tokenServerUrl = "http://localhost:9000/checkToken"
  signOffUrl ="http://localhost:9000/logout"

  login(user: string, password: string): Subject<boolean> {
    let completionSubject = new Subject<boolean>()

    this.http.post<Token>(this.authServerUrl, { "User": user, "Password": password }, httpOptions).subscribe(
      value => this.token = value,
      () => { completionSubject.complete() },
      () => { if (this.token.Token) { this.cookieService.set("Token", this.token.Token); this.isLoggedIn=true; completionSubject.next(true)} }
    )
    return completionSubject;
  }

  logout(token: string): Subject<boolean> {
    this.isLoggedIn = false;
    let response = new Subject<boolean>();
    this.http.post(this.signOffUrl, { "Token": token }, httpOptions).subscribe(
      () => {},
      () => { response.complete() },
      () => { response.next(true) }
    )
    return response;
  }

  checkValidity(): Subject<boolean> {
    let valid = new Subject<boolean>();
    this.http.post(this.tokenServerUrl, {"Token" : this.token}, httpOptions).subscribe(
      () => {},
      () => valid.complete(),
      () => valid.next(true)
    )
    return valid
  }
}
