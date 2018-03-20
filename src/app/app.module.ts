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
import { FilterHtmlTagsPipe } from './overview/filter-html-tags.pipe';
import { StriptextPipe } from './striptext.pipe';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailsComponent,
    NavbarComponent,
    ArticlesPipe,
    FilterHtmlTagsPipe,
    StriptextPipe,
    TagComponent
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
