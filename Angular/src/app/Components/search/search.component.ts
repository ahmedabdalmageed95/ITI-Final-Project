import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PlaygroundService } from './../../Services/playground.service';
import { Playground } from './../../Models/Playground';
import { Dictionary } from './../../Models/Dictionary';
import { SubplaygroundsService } from './../../Services/subplaygrounds.service';
import { SubPlayground } from './../../Models/SubPlayground';
import { Client } from '../../Models/client';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ShowSearch = false;
  Id_type = 2;
  WillSearchByPrice: boolean = false;
  WillSearchByName: boolean = false;
  WillSearchByRate: boolean = false;
  WillSearchByCity: boolean = false;
  WillSearchByStreet: boolean = false;
  ShowSub: boolean = false;
  cities: string[];
  streets: string[];
  currentCity: string;
  currentStreet: string;
  CurrentPrice: number;
  CurrentRate: number;
  CurrentName: string;
  Finished: boolean = false;
  UserIDtype: number = 2;
  temp: Playground[] = new Array();
  Result: Playground[] = new Array();
  subPlaygrounds: SubPlayground[] = new Array();
  Playgroundshows: boolean[] = new Array();
  subPlaygroundshows: boolean[] = new Array();
  CurrentsubPlayground: SubPlayground = new SubPlayground();
  Finish_sub = false;
  ctr: number = 0;
  constructor(
    private pgService: PlaygroundService,
    private spgService: SubplaygroundsService,
    private myRoute:Router
  ) {}

  status;

  ngOnInit() {
    document.body.classList.add('bg-img');
if(localStorage.getItem('CurrentClientID')!=null)
{
this.status=2;
}
else if(localStorage.getItem('CurrentOwnerID')!=null)
{
  this.status=1;
}
else{
  this.status=0;
}





    this.pgService.getCities().subscribe(data => {
      this.cities = data;
      this.currentCity = this.cities[0];
      this.pgService.getStreets(this.currentCity).subscribe(datast => {
        this.streets = datast;
        this.currentStreet = this.streets[0];

        // console.log(this.streets);
        // console.log(this.currentCity);
      });
    });
    window.onload = () => {
      document.getElementById('City').onchange = () => {
        this.pgService.getStreets(this.currentCity).subscribe(data => {
          this.streets = data;
          this.currentStreet = this.streets[0];
          // console.log(this.streets);
          // console.log(this.currentCity);
        });
      };
      document.getElementById('SearchbyCity').onchange = () => {
        if (this.WillSearchByCity === false) {
          this.WillSearchByStreet = false;
        }
      };
    };
  }
  getintersection(Arr1: Playground[], Arr2: Playground[]): Playground[] {
    let Dict: Dictionary = new Dictionary();
    let retArr: Playground[] = new Array();
    if (!Arr1 || Arr1.length == 0 || (!Arr2 || Arr2.length == 0)) {
      return retArr;
    }
    if (Arr1.length <= Arr2.length) {
      for (let i = 0; i < Arr1.length; i++) {
        Dict[Arr1[i].PlaygroundID] = Arr1[i];
      }
      for (let i = 0; i < Arr2.length; i++) {
        if (Dict[Arr2[i].PlaygroundID]) {
          retArr.push(Arr2[i]);
        }
      }
    }
    if (Arr1.length > Arr2.length) {
      for (let i = 0; i < Arr2.length; i++) {
        Dict[Arr2[i].PlaygroundID] = Arr2[i];
      }
      for (let i = 0; i < Arr1.length; i++) {
        if (Dict[Arr1[i].PlaygroundID]) {
          retArr.push(Arr1[i]);
        }
      }
    }
    return retArr;
  }
  isAllspaces(str: string) {
    if (str.length === 0) {
      return true;
    } else {
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
          return false;
        }
      }
      return true;
    }
  }

  search() {
    this.Finished = false;
    this.ctr = 0;
    if (
      !this.WillSearchByCity &&
      !this.WillSearchByName &&
      !this.WillSearchByPrice &&
      !this.WillSearchByRate &&
      !this.WillSearchByStreet
    ) {
      alert('Please Choose a Search field !');
    } else {
      if (
        this.WillSearchByName &&
        (this.CurrentName === '' ||
          !this.CurrentName ||
          this.isAllspaces(this.CurrentName))
      ) {
        alert('Please Enter a name !');
      } else if (
        this.WillSearchByRate &&
        (this.CurrentRate == NaN ||
          this.CurrentRate == undefined ||
          this.CurrentRate == null)
      ) {
        alert('Please Enter a rate !');
      } else if (
        this.WillSearchByPrice &&
        (this.CurrentPrice == NaN ||
          this.CurrentPrice == undefined ||
          this.CurrentPrice == null)
      ) {
        alert('Please Enter a Price !');
      } else if (
        this.WillSearchByStreet &&
        (!this.currentStreet || this.currentStreet == '')
      ) {
        alert('Please Enter a Street !');
      } else if (this.WillSearchByCity && this.currentCity === '') {
        alert('Please Enter a City !');
      } else if (
        this.WillSearchByRate &&
        (this.CurrentRate < 1 || this.CurrentRate > 5)
      ) {
        alert('Please Enter a Valid rate !');
      } else if (this.WillSearchByPrice && this.CurrentPrice <= 0) {
        alert('Please Enter a Valid Price !');
      } else {
        if (this.WillSearchByName) {
          // console.log(this.CurrentName);
          this.pgService
            .getPlaygroundsbyName(this.CurrentName)
            .subscribe(data => {
              this.temp = data;
              this.Result = data;
              // console.log(this.temp);
              // console.log(this.Result);
              if (this.temp.length == 0) {
                this.ShowSearch = true;
                this.Result = new Array();
                this.Finished = true;
                return;
              }
              if (
                !this.WillSearchByCity &&
                !this.WillSearchByPrice &&
                !this.WillSearchByRate
              ) {
                this.Finished = true;
              }
            });
        }
        if (this.WillSearchByCity) {
          // console.log(this.currentCity);
          this.pgService
            .getPlaygroundsbycity(this.currentCity)
            .subscribe(data => {
              this.temp = data;
              if (this.temp.length == 0) {
                this.ShowSearch = true;
                this.Result = new Array();
                this.Finished = true;
                return;
              }
              // console.log(this.Result);
              // console.log(this.temp);
              // call intersect function here
              if (this.WillSearchByName) {
                this.Result = this.getintersection(this.Result, this.temp);
              } else {
                this.Result = this.temp;
              }
              // console.log(this.Result);
              if (
                !this.WillSearchByStreet &&
                !this.WillSearchByPrice &&
                !this.WillSearchByRate
              ) {
                this.Finished = true;
              }
              if (this.WillSearchByStreet) {
                this.pgService
                  .getPlaygroundsbystreet(this.currentStreet)
                  .subscribe(strData => {
                    this.temp = strData;
                    if (this.temp.length == 0) {
                      this.ShowSearch = true;
                      this.Result = new Array();
                      this.Finished = true;
                      return;
                    }
                    if (this.WillSearchByName || this.WillSearchByCity) {
                      this.Result = this.getintersection(
                        this.Result,
                        this.temp
                      );
                    } else {
                      this.Result = this.temp;
                    }
                    if (!this.WillSearchByPrice && !this.WillSearchByRate) {
                      this.Finished = true;
                    }
                  });
              }
            });
        }
        if (this.WillSearchByRate) {
          this.pgService
            .getPlaygroundsbyrate(this.CurrentRate)
            .subscribe(data => {
              this.temp = data;
              if (this.temp.length == 0) {
                this.ShowSearch = true;
                this.Result = new Array();
                this.Finished = true;
                return;
              }
              // console.log(this.temp);
              if (this.WillSearchByName || this.WillSearchByCity) {
                this.Result = this.getintersection(this.Result, this.temp);
              } else {
                this.Result = this.temp;
              }
              if (!this.WillSearchByPrice) {
                this.Finished = true;
              }
            });
        }
        if (this.WillSearchByPrice) {
          this.pgService
            .getPlaygroundsbyprice(this.CurrentPrice)
            .subscribe(data => {
              // console.log(this.CurrentPrice);
              this.temp = data;
              if (this.temp.length == 0) {
                this.ShowSearch = true;
                this.Result = new Array();
                this.Finished = true;
                return;
              }
              if (
                this.WillSearchByName ||
                this.WillSearchByCity ||
                this.WillSearchByRate
              ) {
                // console.log(this.Result);
                // console.log(this.temp);
                this.Result = this.getintersection(this.Result, this.temp);
              } else {
                // console.log(this.Result);
                // console.log(this.temp);
                this.Result = this.temp;
              }
              this.Finished = true;
            });
        }
        this.ShowSearch = true;
      }
    }
  }
  GetSubPlayGrounds(id: number) {
    this.Finish_sub = false;
    this.Playgroundshows = new Array();
    if (this.ctr === 0) {
      for (let i = 0; i < this.Result.length; i++) {
        if (this.Result[i].PlaygroundID === id) {
          this.Playgroundshows.push(true);
        } else {
          this.Playgroundshows.push(false);
        }
      }
    } else {
      for (let i = 0; i < this.Result.length; i++) {
        if (this.Result[i].PlaygroundID === id) {
          this.Playgroundshows[i] = true;
        } else {
          this.Playgroundshows[i] = false;
        }
      }
    }

    this.ctr++;
    this.spgService.GetSubPlaygroundByPlayGroundID(id).subscribe(data => {
      this.subPlaygrounds = data;
      this.Finish_sub = true;
      // console.log(this.subPlaygrounds);
    });
  }
  goback() {
    this.ShowSearch = false;
  }
  GetSubplayground(spid: number) {
    // this.subPlaygrounds = new Array();
    // for (let i = 0; i < this.subPlaygrounds.length; i++) {
    //   if (this.subPlaygrounds[i].SubPlaygroundID === spid) {
    //     this.subPlaygroundshows.push(true);
    //   } else {
    //     this.subPlaygroundshows.push(false);
    //   }
    // }
    this.spgService.GetSubPlayground(spid).subscribe(data => {
      this.CurrentsubPlayground = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['WillSearchByCity'].isFirstChange()) {
      if (
        changes['WillSearchByCity'].previousValue !==
        changes['WillSearchByCity'].currentValue
      ) {
        if (this.WillSearchByCity === false) {
          this.WillSearchByStreet = false;
        }
      }
    }
  }

  onChange(newValue) {
    this.pgService.getStreets(newValue).subscribe(data => {
      this.streets = data;
      this.currentStreet = this.streets[0];
    });
  }

  ReserveClub(subID){
    if(localStorage.getItem('CurrentClientID')==null&&localStorage.getItem('CurrentOwnerID')==null)
    {
      var confMSG = confirm('You have to Login first! Click Confirm to Login or Cancel to back');
      if(confMSG==true)
      {
        // this.myRoute.navigateByUrl('/users/login');
        window.location.assign('/users/login');
      }
    }
    else if(localStorage.getItem('CurrentClientID')!=null)
    {
      // this.myRoute.navigateByUrl('/client/clubs/reserve');
      localStorage.setItem('subToReserve',subID);
      window.location.assign('/client/clubs/reserve');
    }
    else if(localStorage.getItem('CurrentOwnerID')!=null)
    {
      // window.location.assign('/index');
      window.location.assign('/client/clubs/reserve');

    }
  }
}
