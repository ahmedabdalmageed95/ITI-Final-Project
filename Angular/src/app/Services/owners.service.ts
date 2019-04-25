import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Owners } from '../Models/Owners';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class OwnersService {

  constructor(private myHttp:Http) { }
  GetallOwner(): Observable<Owners[]>
  {
    return this.myHttp.get('http://localhost:49692/api/megoKora/getOwner')
   .map (OwnersData => {
      return <Owners[]>OwnersData.json();
    });
  }
  GetSpecificOwner(id):Observable<Owners>
  {
    return this.myHttp.get('http://localhost:49692/api/megoKora/getOwner/'+id)
    .map(specificownerData => {
        return <Owners>specificownerData.json();
      });
  }
PostOwner(NewOwner)
{
  return this.myHttp.post('http://localhost:49692/api/megoKora/postOwner',NewOwner);
}
PutOwner( id , CurrentOwnerData )
{
  return this.myHttp.put('http://localhost:49692/api/megoKora/putOwner/'+id , CurrentOwnerData );
}
DeleteOwner(id)
{
  return this.myHttp.delete('http://localhost:49692/api/megoKora/deleteOwner/'+id );
}
loginOwner(email,password):Observable<Owners>
{
 return this.myHttp.get('http://localhost:49692/api/megoKora/logInOwner/'+email+'/'+password)
  .map(dataAboutOwner=>{
    return <Owners>dataAboutOwner.json();
  })
}
}
