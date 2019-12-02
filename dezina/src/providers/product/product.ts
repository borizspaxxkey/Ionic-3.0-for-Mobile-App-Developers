import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductProvider {

  constructor(public http: Http) {
    console.log('Hello ProductProvider Provider');
  }

  getProducts(){
    return this.http.get('/assets/data.json')
      .map(response => response.json());
  }

}
