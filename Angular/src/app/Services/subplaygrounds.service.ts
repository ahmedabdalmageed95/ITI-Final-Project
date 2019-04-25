import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { SubPlayground } from './../Models/SubPlayground';

@Injectable()
export class SubplaygroundsService {
  constructor(private myHttp: Http) {}

  GetSubPlaygrounds(): Observable<SubPlayground[]> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getSubPlayground')
      .map(SubPlaygroundData => {
        return <SubPlayground[]>SubPlaygroundData.json();
      });
  }

  GetSubPlaygroundByPlayGroundID(id): Observable<SubPlayground[]> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/GetSubPlaygroundByPlayGroundID/'+id)
      .map(SubPlaygroundData => {
        return <SubPlayground[]>SubPlaygroundData.json();
      });
  }

  GetSubPlayground(id): Observable<SubPlayground> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getSubPlayground/' + id)
      .map(SubPlaygroundData => {
        return <SubPlayground>SubPlaygroundData.json();
      });
  }

  PutSubPlayground(id, SubPlaygroundObject) {
    return this.myHttp.put(
      'http://localhost:49692/api/megoKora/putSubPlayground/' + id,
      SubPlaygroundObject
    );
  }

  PostSubPlayground(SubPlaygroundObject) {
    return this.myHttp.post(
      'http://localhost:49692/api/megoKora/postSubPlayground',
      SubPlaygroundObject
    );
  }

  DeleteSubPlayground(id) {
    return this.myHttp.delete(
      'http://localhost:49692/api/megoKora/deleteSubPlayground/' + id
    );
  }
}
