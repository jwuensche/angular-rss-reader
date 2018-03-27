import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import * as Parser from 'rss-parser';

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

	feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.spaceflightnow.com%2Ffeed";
	cors_proxy = "https://cors-anywhere.herokuapp.com/"

  constructor(
  	private httpClient: HttpClient
  	) { }

  getFeed(){
  	return this.httpClient.get<Feed>(this.feedUrl);
  }

  getFeedfromSource() {
  	return this.httpClient.get(this.cors_proxy + 'https://www.spaceflightnow.com/feed/', {responseType: 'text'});
  }
}