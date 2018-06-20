import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';
import { FeedService } from './feed.service';
import { ArticlesPipe } from './overview/articles.pipe';
import { StriptextPipe } from './striptext.pipe';
import { TagComponent } from './tag/tag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SettingsComponent } from './settings/settings.component';
import { StorageService } from "./storage.service";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth.service";
import {AuthGuard} from './auth-guard.service';
import {MatProgressSpinnerModule, MatSnackBarModule, MatButtonModule, MatCheckboxModule, MatChipsModule , MatInputModule, MatIconModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatMenuModule } from '@angular/material/menu';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-y"
    });
    return mc;
  }
}


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailsComponent,
    NavbarComponent,
    ArticlesPipe,
    StriptextPipe,
    TagComponent,
    PageNotFoundComponent,
    GalleryComponent,
    SettingsComponent,
    LoginComponent,
    DashboardComponent
  ],
  providers: [
    FeedService,
    AuthService,
    AuthGuard,
    StorageService,
    FeedService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig ,
    },
    MessageService,
    CookieService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
