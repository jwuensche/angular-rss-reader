import { Injectable } from '@angular/core';
import { StorageElement} from "./storageElement";
import {element} from "protractor";
import {Subject} from "rxjs/Subject";

@Injectable()
export class StorageService {

  constructor() { }
  storage = new Array<StorageElement>();

  setItem(key: string, value: string){
    let resultFound = null;
    this.storage.map(
      element => element.Name == key ? (element.Content.next(value), resultFound= 0): ()=> {}
    )
    if(resultFound == null) {
      let tmp = new StorageElement();
      tmp.Name = key;
      tmp.Content = new Subject<string>();
      tmp.Content.next(value);
      this.storage.push(tmp);
    }
    //This is still included because of debug purposes
    localStorage.setItem('currentSection', value);
  }
  getItem(key: string): Subject<string> {
    const result = this.storage.filter( element => element.Name == key);
    if ( result[0] == null) {
      this.setItem(key, '');
      return this.getItem(key);
    }
    return result[0].Content;
  }
}
