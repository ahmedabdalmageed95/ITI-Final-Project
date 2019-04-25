import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { Client } from '../Models/client';

@Injectable()
export class ClientService {
  constructor(private myhttp: Http) {
    // code
  }
  getAllCilents(): Observable<Client[]> {
    return this.myhttp
      .get('http://localhost:49692/api/megoKora/getClient')
      .map(clientData => {
        return <Client[]>clientData.json();
      });
  }
  getSpecificClient(id): Observable<Client> {
    return this.myhttp
      .get('http://localhost:49692/api/megoKora/getClient/' + id)
      .map(clientData => {
        return <Client>clientData.json();
      });
  }
  postClient(newClient) {
    return this.myhttp.post(
      'http://localhost:49692/api/megoKora/postClient',
      newClient
    );
  }
  deleteClient(id) {
    return this.myhttp.delete(
      'http://localhost:49692/api/megoKora/deleteClient/' + id
    );
  }
  putClient(id, currentClientNewData) {
    return this.myhttp.put(
      'http://localhost:49692/api/megoKora/putClient/' + id,
      currentClientNewData
    );
  }

  loginClient(email,password):Observable<Client>
  {
    return this.myhttp.get("http://localhost:49692/api/megoKora/logInClient/"+email+"/"+password)
    .map(dataAbutClient=>{
    return <Client>dataAbutClient.json();
    });

  }

  CheckUniqueEmail(email,id):Observable<boolean>
  {
    return this.myhttp.get("http://localhost:49692/api/megoKora/CheckUniqueMail/"+email+"/"+id).map(returnValue=>{

     return <boolean>returnValue.json();
    });

  }
}
