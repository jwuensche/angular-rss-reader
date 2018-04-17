import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Feed {
  Url: string;
  Title: string;
  Link: string;
  Author: string;
  Description: string;
  Image: string;
	Items: [{
			Title: string;
			Published: string;
			Link: string;
			Guid: string;
			Author: {
			  Name: string;
      }
			Description: string;
			Content: string;
			Categories: [string];
		}
	]
}

export interface ArticleInterface {
	Title: string;
	Description: string;
	Content: string;
	Categories: [string];
	PublishedParsed: string;
	Author: {
		Name: string;
	}
	Link: string;
}

export interface FeedList {
  Name: string;
  URL: string;
}

@Injectable()
export class FeedService {
  constructor(
  	private httpClient: HttpClient
  	) { }

  getFeed(name: string){
	  return this.httpClient.get<Feed>("http://localhost:8000/feed/" + name);
  }
  getArticle(id: number, name: string){
	  return this.httpClient.get<ArticleInterface>("http://localhost:8000/feed/"+ name + "/" +id);
  }
  getFeedList(){
    return this.httpClient.get<FeedList>("http://localhost:8000/feeds");
  }
}
