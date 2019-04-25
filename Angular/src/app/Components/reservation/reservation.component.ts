import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './../../Services/reservations.service';
import { Reservation } from './../../Models/Reservation';
import { SubplaygroundsService } from './../../Services/subplaygrounds.service';
import { ClientService } from './../../Services/client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  constructor(
    private ReseveService: ReservationsService,
    private SpgService: SubplaygroundsService,
    private ClService: ClientService,
    private myRoute:Router
  ) {}
  Reservations: Reservation[] = new Array();
  ReservationsStates: number[] = new Array(); // 0 for non reserved 1 for reserved byclient 2 for reserved by others or expired slots
  // 3 for currently chosen before submit
  // supposed from 10 am (10:00) to 11 pm (23:00) 13 slots
  Today = new Date();
  SubPlayGroundID = Number.parseInt(localStorage.getItem('subToReserve')); // the expected ID of the subplay ground (from search or whatever)
  ClientID = Number.parseInt(localStorage.getItem('CurrentClientID')); // Client ID (from login)
  
  ChosenDate: Date;
  Show_Error: boolean = false;
  Show_DivText:boolean=true;
  First_Time = true;
  Show_Choice_Error = false;
  SlotsCtr = 0;
  ngOnInit() {
    if(localStorage.getItem('CurrentClientID')==null){
      this.ClientID=Number.parseInt(localStorage.getItem('dummyUser'));
    }
// if(localStorage.getItem('subToReserve')==null)
// {
//   window.location.assign('/clubs/search');
// }

    // get all reservations based on subplaygroundid
    window.onload = () => {
      document.getElementById('Date').onchange = () => {
        if (
          !this.ChosenDate ||
          new Date(this.ChosenDate).getFullYear() < this.Today.getFullYear() ||
          (new Date(this.ChosenDate).getMonth() < this.Today.getMonth() &&
            new Date(this.ChosenDate).getFullYear() ===
              this.Today.getFullYear()) ||
          (new Date(this.ChosenDate).getDate() < this.Today.getDate() &&
            (new Date(this.ChosenDate).getMonth() === this.Today.getMonth() &&
              new Date(this.ChosenDate).getFullYear() ===
                this.Today.getFullYear()))
        ) {
          this.Show_Error = true;
        } else {
          this.Show_Error = false;
          this.Show_DivText=false;
          this.ReseveService
            .GetReservationBySubPlayground(this.SubPlayGroundID)
            .subscribe(data => {
              this.Reservations = data;
              this.ReservationsStates = [];
              // console.log(this.Reservations);
              if (!this.Reservations || this.Reservations.length === 0) {
                for (let i = 0; i < 13; i++) {
                  // console.log(i);
                  if (
                    this.CheckDate(
                      new Date(this.ChosenDate).getFullYear(),
                      new Date(this.ChosenDate).getMonth() + 1,
                      new Date(this.ChosenDate).getDate(),
                      i + 10
                    )
                  ) {
                    this.ReservationsStates.push(0);
                  } else {
                    this.ReservationsStates.push(2);
                  }
                }
              } else {
                this.Reservations = this.FilterByDate(
                  this.Reservations,
                  new Date(this.ChosenDate)
                );
                this.Reservations = this.SortRes(this.Reservations);
                // console.log(this.Reservations);
                if (this.Reservations.length === 0) {
                  for (let i = 0; i < 13; i++) {
                    if (
                      this.CheckDate(
                        new Date(this.ChosenDate).getFullYear(),
                        new Date(this.ChosenDate).getMonth() + 1,
                        new Date(this.ChosenDate).getDate(),
                        i + 10
                      )
                    ) {
                      this.ReservationsStates.push(0);
                    } else {
                      this.ReservationsStates.push(2);
                    }
                  }
                } else {
                  for (let i = 10; i < this.Reservations[0].From; i++) {
                    if (
                      this.CheckDate(
                        new Date(this.ChosenDate).getFullYear(),
                        new Date(this.ChosenDate).getMonth() + 1,
                        new Date(this.ChosenDate).getDate(),
                        i
                      )
                    ) {
                      this.ReservationsStates.push(0);
                    } else {
                      this.ReservationsStates.push(2);
                    }
                  }
                  // console.log(this.ReservationsStates);
                  for (let i = 0; i < this.Reservations.length; i++) {
                    if (
                      this.Reservations[i].ClientID === this.ClientID &&
                      // ((this.Reservations[i].From > this.Today.getHours() &&
                      //   this.Reservations[i].Day === this.Today.getDate()) ||
                      //   this.Reservations[i].Day > this.Today.getDate())
                      this.CheckDate(
                        this.Reservations[i].Year,
                        this.Reservations[i].Month,
                        this.Reservations[i].Day,
                        this.Reservations[i].From
                      )
                    ) {
                      for (
                        let j = 0;
                        j < this.Reservations[i].To - this.Reservations[i].From;
                        j++
                      ) {
                        this.ReservationsStates.push(1);
                      }
                    } else if (
                      this.Reservations[i].ClientID !== this.ClientID ||
                      // ((this.Reservations[i].From < this.Today.getHours() &&
                      //   (this.Reservations[i].Day === this.Today.getDate() &&
                      //     this.Reservations[i].Month ===
                      //       this.Today.getMonth() &&
                      //     this.Reservations[i].Year ===
                      //       this.Today.getFullYear())) ||
                      //   this.Reservations[i].Day < this.Today.getDate())
                      !this.CheckDate(
                        this.Reservations[i].Year,
                        this.Reservations[i].Month,
                        this.Reservations[i].Day,
                        this.Reservations[i].From
                      )
                    ) {
                      for (
                        let j = 0;
                        j < this.Reservations[i].To - this.Reservations[i].From;
                        j++
                      ) {
                        this.ReservationsStates.push(2);
                      }
                    }
                    if (
                      i + 1 < this.Reservations.length &&
                      this.Reservations[i].To !== this.Reservations[i + 1].From
                    ) {
                      for (
                        let j = 0;
                        j <
                        this.Reservations[i + 1].From - this.Reservations[i].To;
                        j++
                      ) {
                        if (
                          this.CheckDate(
                            new Date(this.ChosenDate).getFullYear(),
                            new Date(this.ChosenDate).getMonth() + 1,
                            new Date(this.ChosenDate).getDate(),
                            j + 10
                          )
                        ) {
                          this.ReservationsStates.push(0);
                        } else {
                          this.ReservationsStates.push(2);
                        }
                      }
                    }
                  }
                  console.log(this.ReservationsStates);
                  for (
                    let i = this.Reservations[this.Reservations.length - 1].To;
                    i < 23;
                    i++
                  ) {
                    if (
                      this.CheckDate(
                        new Date(this.ChosenDate).getFullYear(),
                        new Date(this.ChosenDate).getMonth() + 1,
                        new Date(this.ChosenDate).getDate(),
                        i
                      )
                    ) {
                      this.ReservationsStates.push(0);
                    } else {
                      this.ReservationsStates.push(2);
                    }
                  }
                  // console.log(this.ReservationsStates);
                }
              }
              this.First_Time = false;
            });
        }
      };
    };
  }
  CheckDate(y1: number, m1: number, d1: number, h1: number) {
    // console.log(y1);
    // console.log(m1);
    // console.log(d1);
    // console.log(h1);
    // console.log(this.Today.getFullYear());
    // console.log(this.Today.getMonth());
    // console.log(this.Today.getDate());
    // console.log(this.Today.getHours());
    if (y1 > this.Today.getFullYear()) {
      return true;
    } else if (
      y1 === this.Today.getFullYear() &&
      m1 > this.Today.getMonth() + 1
    ) {
      return true;
    } else if (
      y1 === this.Today.getFullYear() &&
      m1 === this.Today.getMonth() + 1 &&
      d1 > this.Today.getDate()
    ) {
      return true;
    } else if (
      y1 === this.Today.getFullYear() &&
      m1 === this.Today.getMonth() + 1 &&
      d1 === this.Today.getDate() &&
      h1 > this.Today.getHours()
    ) {
      console.log(this.Today.getHours());
      console.log(h1);
      return true;
    } else {
      return false;
    }
  }
  FilterByDate(Reserves: Reservation[], date: Date): Reservation[] {
    Reserves = Reserves.filter(r => {
      return (
        r.Day === date.getDate() &&
        r.Month === date.getMonth() + 1 &&
        r.Year === date.getFullYear()
      );
    });
    return Reserves;
  }
  SortRes(Reserves: Reservation[]): Reservation[] {
    Reserves = Reserves.sort((r1, r2) => {
      if (r1.From > r2.From) {
        return 1;
      }
      if (r1.From < r2.From) {
        return -1;
      } else {
        return 0;
      }
    });
    return Reserves;
  }
  Slot_Fit(index: number) {
    if (this.SlotsCtr > 1) {
      if (index === 0) {
        if (this.ReservationsStates[index + 1] !== 3) {
          return false;
        } else {
          return true;
        }
      } else if (index === this.ReservationsStates.length - 1) {
        if (this.ReservationsStates[index - 1] !== 3) {
          return false;
        } else {
          // things go well
          return true;
        }
      } else {
        if (index < this.ReservationsStates.length - 1 && index > 0) {
          if (
            this.ReservationsStates[index + 1] !== 3 &&
            this.ReservationsStates[index - 1] !== 3
          ) {
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      return true;
    }
  }
  Add(index: number) {
    this.SlotsCtr++;
    this.ReservationsStates[index] = 3;
    this.Show_Choice_Error = false;
    for (let i = 0; i < this.ReservationsStates.length; i++) {
      if (this.ReservationsStates[i] === 3) {
        if (!this.Slot_Fit(i)) {
          this.Show_Choice_Error = true;
          break;
        }
      }
    }
  }
  Remove(index: number) {
    this.SlotsCtr--;
    this.ReservationsStates[index] = 0;
    this.Show_Choice_Error = false;
    for (let i = 0; i < this.ReservationsStates.length; i++) {
      if (this.ReservationsStates[i] === 3) {
        if (!this.Slot_Fit(i)) {
          this.Show_Choice_Error = true;
          break;
        }
      }
    }
  }
  InsertReservation() {
    if (!this.Show_Choice_Error) {
      this.SpgService.GetSubPlayground(this.SubPlayGroundID).subscribe(data => {
        const Res = new Reservation();
        Res.ReservationID = 0;
        Res.ClientID = this.ClientID;
        Res.SubPlaygroundID = this.SubPlayGroundID;
        Res.SubPlayground = null;
        let isOneHour = false;
        for (let i = 0; i < this.ReservationsStates.length; i++) {
          if (this.ReservationsStates[i] === 3) {
            Res.From = i + 10;
            if (this.SlotsCtr === 1) {
              Res.To = Res.From + 1;
              Res.NumberOfHours = 1;
              isOneHour = true;
            }
            break;
          }
        }
        if (!isOneHour) {
          for (let i = 0; i < this.ReservationsStates.length; i++) {
            if (
              this.ReservationsStates[i] === 3 &&
              (i === this.ReservationsStates.length - 1 ||
                (i < this.ReservationsStates.length - 1 &&
                  this.ReservationsStates[i + 1] !== 3))
            ) {
              Res.To = i + 11;
              Res.NumberOfHours = Res.To - Res.From;
              break;
            }
          }
        }
        Res.Client = null;
        Res.ReservationISDone = false;
        Res.Day = new Date(this.ChosenDate).getDate();
        Res.Month = new Date(this.ChosenDate).getMonth() + 1;
        Res.Year = new Date(this.ChosenDate).getFullYear();
        Res.TotalMoney = Res.NumberOfHours * data.Price;
        this.ReseveService.PostReservation(Res).subscribe(
          Insdata => {
            if (Insdata.status >= 200 && Insdata.status <= 300) {
              this.ClService
                .getSpecificClient(this.ClientID)
                .subscribe(Cdata => {
                  Cdata.Balance -= Res.NumberOfHours * data.Price;
                  this.ClService.putClient(this.ClientID, Cdata).subscribe();
                });
              for (let j = 0; j < this.ReservationsStates.length; j++) {
                if (this.ReservationsStates[j] === 3) {
                  this.ReservationsStates[j] = 1;
                }
              }
              this.SlotsCtr = 0;
            }
            localStorage.removeItem('subToReserve');
          },
          err => {
            alert('Error');
          }
        );
      });
    }
  }
  // getTodayDate() {
  //   document.getElementById('Date').value =
  //     this.Today.getFullYear() +
  //     '-' +
  //     ('0' + (this.Today.getMonth() + 1)).slice(-2) +
  //     '-' +
  //     ('0' + this.Today.getDate()).slice(-2);
  // }
  goToRes(){
    $("#closeModal").trigger( "click" );
  this.myRoute.navigate(['/client/clubs/reservations']);
  }
}
