import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, ActivatedRoute
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookieService.get("Token")) {
      this.authService.token.Token = this.cookieService.get("Token")
      return true
    }
    if (this.authService.token.Token)
      return true
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
