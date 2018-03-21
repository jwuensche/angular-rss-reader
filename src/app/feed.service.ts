import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Feed {
	status: string;
	feed: {
		url: string;
		title: string;
		link: string;
		author: string;
		description: string;
		image: string;
	};
	items: [{
			title: string;
			pubDate: string;
			link: string;
			guid: string;
			author: string;
			thumbnail: string;
			description: string;
			content: string;
			enclosure: string;
			categories: [string];
		}
	]
}

@Injectable()
export class FeedService {

	//feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.spaceflightnow.com%2Ffeed";
	feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.spaceflightnow.com%2Ffeed";

  constructor(
  	private httpClient: HttpClient
  	) { }

  getFeed(){
  	return this.httpClient.get<Feed>(this.feedUrl);
  }

/*  getFeedfromSource(url: string){
  	var xmlString = this.httpClient.get(url);
  	parser = new Parser();
	let feed = parser.parseString(xmlString);
	return feed;
  }*/

}
