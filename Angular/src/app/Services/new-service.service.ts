import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class NewServiceService {
  constructor(private HTTP: Http) {}
  url = 'https://jsonplaceholder.typicode.com/posts';
  getUsers() {
    return this.HTTP.get(this.url);
  }
}
