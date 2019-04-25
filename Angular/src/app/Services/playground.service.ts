import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Playground } from './../Models/Playground';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class PlaygroundService {
  constructor(private HTTP: Http) { }
  url = '';
  getPlaygrounds(): Observable<Playground[]> {
    this.url = 'http://localhost:49692/api/megoKora/getPlaygrounds';
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }
  getPlaygroundsbyName(Name: string): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbyName/' + Name;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }
  searchPlaygroundsbyid(ID: number): Observable<Playground> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbyid/' + ID;
    return this.HTTP.get(this.url).map(data => {
      return <Playground>data.json();
    });
  }
  getPlaygroundsbyprice(price: number): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbyprice/' + price;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }

  getPlaygroundsbyrate(rate: number): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbyrate/' + rate;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }

  getPlaygroundsbystreet(street: string): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbystreet/' + street;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }
  getPlaygroundsbycity(city: string): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbycity/' + city;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }

  getPlaygroundsbyowner(ownerID: number): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbyowner/' + ownerID;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }

  getPlaygroundsbytime(
    from: number,
    to: number,
    day: number,
    month: number,
    year: number
  ): Observable<Playground[]> {
    this.url =
      'http://localhost:49692/api/megoKora/searchPlaygroundsbytime?from=' +
      from +
      '&to=' +
      to +
      '&day=' +
      day +
      '&month=' +
      month +
      '&year=' +
      year;
    return this.HTTP.get(this.url).map(data => {
      return <Playground[]>data.json();
    });
  }
  insertPlayground(pg: Playground) {
    this.url = 'http://localhost:49692/api/megoKora/postPlaygrounds';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.HTTP.post(this.url, JSON.stringify(pg), { headers: headers });
  }
  updatePlayground(pg: Playground) {
    this.url = 'http://localhost:49692/api/megoKora/putPlaygrounds';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.HTTP.put(this.url, JSON.stringify(pg), { headers: headers });
  }
  deletePlayground(id: number) {
    this.url = 'http://localhost:49692/api/megoKora/deletePlaygrounds/' + id;
    return this.HTTP.delete(this.url);
  }

  getStreets(city: string): Observable<string[]> {

    this.url = 'http://localhost:49692/api/megoKora/getStreets/' + city;

    return this.HTTP.get(this.url).map(data => {

      return <string[]>data.json();

    });

  }
  getCities(): Observable<string[]> {

    this.url = 'http://localhost:49692/api/megoKora/getCities';

    return this.HTTP.get(this.url).map(data => {

      return <string[]>data.json();

    });

  }
  searchPlaygroundsbysubplayground(ID: number): Observable<Playground> {

    this.url = 'http://localhost:49692/api/megoKora/getPlaygroundbySub/' + ID;

    return this.HTTP.get(this.url).map(data => {

      return <Playground>data.json();

    });

  }
}
