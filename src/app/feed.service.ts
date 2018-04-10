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
			published: string;
			link: string;
			guid: string;
			author: string;
			thumbnail: string;
			description: string;
			content: string;
			categories: [string];
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

@Injectable()
export class FeedService {
  constructor(
  	private httpClient: HttpClient
  	) { }

  getFeed(){
	  return this.httpClient.get<Feed>("http://localhost:8000/feed");
  }
  getArticle(id){
	  return this.httpClient.get<ArticleInterface>("http://localhost:8000/feed/"+id)
  }
}
