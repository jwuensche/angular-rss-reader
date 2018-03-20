import { Pipe, PipeTransform } from '@angular/core';
import { Feed } from '../feed.service'

@Pipe({
  name: 'articles'
})
export class ArticlesPipe implements PipeTransform {
//TBD
//any is in this case a list of unspecified json objects maybe improved by implementing real interface in the future
  transform(feed: Feed): any {
  	if (feed == null){
  		return null;
  	}
  	return feed.items;
  }
}