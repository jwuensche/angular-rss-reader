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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  MessageService,
  FeedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
