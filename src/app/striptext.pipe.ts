import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striptext'
})
export class StriptextPipe implements PipeTransform {

  transform(content: string): string {
	var div = document.createElement("div");
	div.innerHTML = content;
	var text = div.textContent || div.innerText || "";
	return text;
	}
}
