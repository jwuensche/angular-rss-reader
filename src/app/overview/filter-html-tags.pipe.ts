import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHtmlTags'
})
export class FilterHtmlTagsPipe implements PipeTransform {

  transform(item: string): string {
    if( item.indexOf('<a') >= 0){
    	item = item.slice(0,item.indexOf('<a'));
	}
	return item;
  }

}
