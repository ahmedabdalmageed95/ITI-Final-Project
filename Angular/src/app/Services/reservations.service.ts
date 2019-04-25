import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Reservation } from './../Models/Reservation';
@Injectable()
export class ReservationsService {
  constructor(private myHttp: Http) {}

  GetReservations(): Observable<Reservation[]> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getReservation')
      .map(ReservationData => {
        return <Reservation[]>ReservationData.json();
      });
  }
  GetReservation(id): Observable<Reservation> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getReservation/' + id)
      .map(ReservationData => {
        return <Reservation>ReservationData.json();
      });
  }

  GetReservationBySubPlayground(id): Observable<Reservation[]> {
    return this.myHttp
      .get(
        'http://localhost:49692/api/megoKora/getReservationBySubPlayground/' +
          id
      )
      .map(ReservationData => {
        return <Reservation[]>ReservationData.json();
      });
  }

  GetReservationByClient(id): Observable<Reservation[]> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getReservationByClient/' + id)
      .map(ReservationData => {
        return <Reservation[]>ReservationData.json();
      });
  }

  PutReservation(id, ReservationObject) {
    return this.myHttp.put(
      'http://localhost:49692/api/megoKora/putReservation/' + id,
      ReservationObject
    );
  }

  PostReservation(ReservationObject) {
    return this.myHttp.post(
      'http://localhost:49692/api/megoKora/postReservation/',
      ReservationObject
    );
  }

  DeleteReservation(id) {
    return this.myHttp.delete(
      'http://localhost:49692/api/megoKora/deleteReservation/' + id
    );
  }
}
