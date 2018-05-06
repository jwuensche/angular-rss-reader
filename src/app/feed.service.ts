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
  //TODO set type now only for webpack so it will chill down
  feedList;

  constructor(
  	private httpClient: HttpClient
  	) {
      this.httpClient.get<Array<FeedList>>("http://localhost:8000/feeds").subscribe(
        value => this.feedList = value,
        () => {},
        () => this.feedList.forEach(element => element.Selected = localStorage.getItem(element.Name) == 'true' ? true : false)
      );
    }

  getFeed(name: string){
	  return this.httpClient.get<Feed>("http://localhost:8000/feed/" + name);
  }
  getArticle(id: number, name: string){
	  return this.httpClient.get<ArticleInterface>("http://localhost:8000/feed/"+ name + "/" +id);
  }


  //TODO fix typing problem occuring here since i register it only as a single object but a array is later expected
  getFeedList(){
    return this.httpClient.get<FeedList>("http://localhost:8000/feeds");
  }

  postFeeds(url: string){
    const bar: FeedRegistry = { url: url};
    return this.httpClient.post<FeedRegistry>("http://localhost:8000/addFeed", bar, httpOptions);
  }
}
