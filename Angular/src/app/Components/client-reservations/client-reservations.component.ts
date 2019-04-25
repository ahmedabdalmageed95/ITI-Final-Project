import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './../../Services/reservations.service';
import { Reservation } from './../../Models/Reservation';
import { ClientService } from './../../Services/client.service';
import { PlaygroundService } from './../../Services/playground.service';
import { SubplaygroundsService } from './../../Services/subplaygrounds.service';
import { SpgDictionary } from './../../Models/SpgDictionary';
import { SubPlayground } from './../../Models/SubPlayground';
@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {
  constructor(
    private ResService: ReservationsService,
    private ClService: ClientService,
    private PgService: PlaygroundService,
    private SpgService: SubplaygroundsService
  ) {}
  ClientID: number = Number.parseInt(localStorage.getItem('CurrentClientID'));
  Reservations: Reservation[] = new Array();
  CurrentDeleted: Reservation;
  Resfinished = false;
  ShowModal = true;
  SpgDict = new SpgDictionary();
  ngOnInit() {
    this.SpgService.GetSubPlaygrounds().subscribe(Spgdata => {
      if (Spgdata) {
        // create dictionary
        for (let i = 0; i < Spgdata.length; i++) {
          this.SpgDict[Spgdata[i].SubPlaygroundID] = Spgdata[i];
        }
      }
      this.ResService.GetReservationByClient(this.ClientID).subscribe(data => {
        if (data && data.length > 0) {
          this.Reservations = data.sort((r1, r2) => {
            return this.CompareDate(
              r1.Day,
              r1.Month,
              r1.Year,
              r2.Day,
              r2.Month,
              r2.Year
            );
          });
        } else {
          this.Reservations = data;
        }
        this.Resfinished = true;
        if (this.Reservations && this.Reservations.length > 0) {
          for (let i = 0; i < this.Reservations.length; i++) {
            // get subplayground for each subplayground
            if (this.SpgDict[this.Reservations[i].SubPlaygroundID]) {
              this.Reservations[i].SubPlayground = this.SpgDict[
                this.Reservations[i].SubPlaygroundID
              ];
            }
          }
          // then get playground
          for (let i = 0; i < this.Reservations.length; i++) {
            this.PgService
              .searchPlaygroundsbysubplayground(
                this.Reservations[i].SubPlaygroundID
              )
              .subscribe(Pdata => {
                if (Pdata) {
                  this.Reservations[i].SubPlayground.Playground = Pdata;
                  // then for each PG get array of sps
                  this.SpgService
                    .GetSubPlaygroundByPlayGroundID(Pdata.PlaygroundID)
                    .subscribe(Sdata => {
                      if (this.Reservations[i].SubPlayground.Playground) {
                        this.Reservations[
                          i
                        ].SubPlayground.Playground.SubPlaygrounds = Sdata;
                      }
                    });
                }
              });
          }
          // then for each PG get array of sps
        }
      });
    });
  }
  GetSPIndex(Sps: SubPlayground[], id: number) {
    if (Sps) {
      for (let i = 0; i < Sps.length; i++) {
        if (Sps[i].SubPlaygroundID === id) {
          return i + 1;
        }
      }
    }
  }

  CheckDate(y1: number, m1: number, d1: number) {
    if (y1 > new Date().getFullYear()) {
      return true;
    } else if (
      y1 === new Date().getFullYear() &&
      m1 > new Date().getMonth() + 1
    ) {
      return true;
    } else if (
      y1 === new Date().getFullYear() &&
      m1 === new Date().getMonth() + 1 &&
      d1 > new Date().getDate()
    ) {
      return true;
    } else {
      return false;
    }
  }
  SetDeleted(Res: Reservation) {
    this.CurrentDeleted = Res;
    this.ShowModal = true;
  }
  DeleteReservation(id: number) {
    this.ResService.DeleteReservation(id).subscribe(data => {
      if (this.Reservations) {
        for (let i = 0; i < this.Reservations.length; i++) {
          if (this.Reservations[i].ReservationID === id) {
            this.Reservations.splice(i, 1);
            this.ShowModal = false;
            break;
          }
        }
      }
    });
  }

  CompareDate(d1, m1, y1, d2, m2, y2) {
    if (d1 === d2 && m1 === m2 && y1 === y2) {
      return 0;
    } else {
      if (d1 > d2 && m1 === m2 && y1 === y2) {
        return -1;
      } else if (m1 > m2 && y1 === y2) {
        return -1;
      } else if (y1 > y2) {
        return -1;
      } else {
        return 1;
      }
    }
  }


}
