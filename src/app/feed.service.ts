import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

export interface FeedRegistry{
  url: string
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
  Selected?: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class FeedService {
  feedList;

  constructor(
  	private httpClient: HttpClient
  	) {}

  getFeed(name: string, token: string){
	  return this.httpClient.post<Feed>("http://localhost:8000/feed/" + name, {"Token": token}, httpOptions);
  }
  getArticle(id: number, name: string, token: string){
	  return this.httpClient.post<ArticleInterface>("http://localhost:8000/feed/"+ name + "/" +id, {"Token":token}, httpOptions);
  }


  //TODO fix typing problem occuring here since i register it only as a single object but a array is later expected
  getFeedList(token: string){
    this.httpClient.post<Array<FeedList>>("http://localhost:8000/feeds", {"Token": token}).subscribe(
      value => this.feedList = value,
      () => {},
      () => this.feedList.forEach(element => element.Selected = localStorage.getItem(element.Name) == 'true' ? true : false)
    );
  }

  postFeeds(url: string) {
    const bar: FeedRegistry = {url: url};
    return this.httpClient.put<FeedRegistry>("http://localhost:8000/addFeeds", bar, httpOptions);
  }
}
