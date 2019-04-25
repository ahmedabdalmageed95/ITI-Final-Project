import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './../../Services/reservations.service';
import { PlaygroundService } from './../../Services/playground.service';
import { SubplaygroundsService } from './../../Services/subplaygrounds.service';
import { Reservation } from './../../Models/Reservation';
import { SubPlayground } from './../../Models/SubPlayground';
import { Playground } from './../../Models/Playground';
import { ClientService } from './../../Services/client.service';
import { ClDictionary } from './../../Models/ClDictionary'; // added----------------------
import { Client } from './../../Models/client'; // added-----------------------------------
@Component({
  selector: 'app-owner-reservation',
  templateUrl: './owner-reservation.component.html',
  styleUrls: ['./owner-reservation.component.css']
})
export class OwnerReservationComponent implements OnInit {
  constructor(
    private ResService: ReservationsService,
    private PgService: PlaygroundService,
    private SpgService: SubplaygroundsService,
    private ClService: ClientService
  ) {}
  OwnerID: number = Number.parseInt(localStorage.getItem('CurrentOwnerID'));
  PlayGrounds: Playground[] = new Array();
  SubPlayGrounds: SubPlayground[] = new Array();
  Reservations: Reservation[] = new Array();
  ClientNames: string[] = new Array();
  ClientDect: ClDictionary = new ClDictionary(); // added----------------------------------------------
  Playgroundfinished: boolean = false;
  SPfinished: boolean = false;
  ResFinished = false;
  ClFinish = false;
  SubPlaygroundShow: boolean[] = new Array();
  ngOnInit() {
    this.Playgroundfinished = false;
    this.PgService.getPlaygroundsbyowner(this.OwnerID).subscribe(data => {
      this.PlayGrounds = data.sort((p1, p2) => {
        if (p1.PlaygroundID > p2.PlaygroundID) {
          return 1;
        } else if (p1.PlaygroundID < p2.PlaygroundID) {
          return -1;
        } else {
          return 0;
        }
      });
      this.Playgroundfinished = true;
      for (let i = 0; i < data.length; i++) {
        this.SubPlaygroundShow.push(false);
      }
      // for (let i = 0; i < data.length; i++) {
      //   this.PlayGroundNames.push(data[i].Name);
      //   const CurrentSPs: number[] = new Array();
      //   const CurrentPRes: Reservation[][] = new Array();
      //   let ctr = 0;
      //   this.SpgService
      //     .GetSubPlaygroundByPlayGroundID(data[i].PlaygroundID)
      //     .subscribe(spgData => {
      //       spgData = spgData.sort((sp1, sp2) => {
      //         if (sp1.Playground > sp2.Playground) {
      //           return 1;
      //         } else if (sp1.Playground < sp2.Playground) {
      //           return -1;
      //         } else {
      //           return 0;
      //         }
      //       });
      //       if (i === data.length - 1) {
      //         this.SPfinished = true;
      //       }
      //       for (let j = 0; j < spgData.length; j++) {
      //         ctr++;
      //         CurrentSPs.push(ctr);
      //         this.ResService
      //           .GetReservationBySubPlayground(spgData[j].SubPlaygroundID)
      //           .subscribe(ResData => {
      //             CurrentPRes.push(ResData);
      //             if (j === spgData.length - 1) {
      //               this.ResFinished = true;
      //             }
      //           });
      //       }
      //       this.SubPlayGrounds.push(CurrentSPs);
      //       this.TotalReservations.push(CurrentPRes);
      //     });
      // }
    });
  }

  ShowSubPlayGrounds(id: number) {
    this.SPfinished = false;
    this.SpgService.GetSubPlaygroundByPlayGroundID(id).subscribe(data => {
      this.SubPlayGrounds = data.sort((p1, p2) => {
        if (p1.SubPlaygroundID > p2.SubPlaygroundID) {
          return 1;
        } else if (p1.SubPlaygroundID < p2.SubPlaygroundID) {
          return -1;
        } else {
          return 0;
        }
      });
      for (let i = 0; i < this.SubPlaygroundShow.length; i++) {
        //     console.log(this.SubPlaygroundShow[i]);
        if (this.PlayGrounds[i].PlaygroundID === id) {
          this.SubPlaygroundShow[i] = true;
          //      console.log(this.SubPlaygroundShow[i]);
        } else {
          this.SubPlaygroundShow[i] = false;
        }
      }
      this.SPfinished = true;
    });
  }
  // edited----------------------------------------------------------
  ShowReservations(id: number) {
    this.ResFinished = false;
    this.ResService.GetReservationBySubPlayground(id).subscribe(data => {
      // this.Reservations = data;

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
    //  console.log(data);
    //  this.ResFinished = true
      //console.log(this.ResFinished);
      ///////////////////////// added/////////////////////////////
      this.ClService.getAllCilents().subscribe(ClData => {
        if (ClData) {
          for (let i = 0; i < ClData.length; i++) {
            this.ClientDect[ClData[i].ClientID] = ClData[i];
          }
          for (let i = 0; i < this.Reservations.length; i++) {
            if (this.ClientDect[this.Reservations[i].ClientID]) {
              this.Reservations[i].Client = this.ClientDect[
                this.Reservations[i].ClientID
              ];
            }
          }
          this.ResFinished = true;
        }
        else{
          this.ResFinished = true;
        }
      });
    });
  }
  CheckDate(y1: number, m1: number, d1: number, h1: number) {
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
    } else if (
      y1 === new Date().getFullYear() &&
      m1 === new Date().getMonth() + 1 &&
      d1 === new Date().getDate() &&
      h1 >= new Date().getHours()
    ) {
      return true;
    } else {
      return false;
    }
  }
  ShowResolveButton(res: Reservation) {
    return (
      this.CheckDate(res.Year, res.Month, res.Day, res.To) &&
      !res.ReservationISDone
    );
  }
  Resolve(Res: Reservation) {
    this.ClService.getSpecificClient(Res.ClientID).subscribe(data => {
      data.Balance += Res.TotalMoney;
      Res.ReservationISDone = true;
      this.ClService.putClient(data.ClientID, data).subscribe();
      this.ResService.PutReservation(Res.ReservationID, Res).subscribe();
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
