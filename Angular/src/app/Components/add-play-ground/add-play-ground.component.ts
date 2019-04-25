import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from '../../Services/playground.service'
import { Playground } from '../../Models/Playground';
import { SubPlayground } from '../../Models/SubPlayground';
import { SubplaygroundsService } from '../../Services/subplaygrounds.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-play-ground',
  templateUrl: './add-play-ground.component.html',
  styleUrls: ['./add-play-ground.component.css']
})
export class AddPlayGroundComponent implements OnInit {

  constructor(private myServ: PlaygroundService,private myServ2:SubplaygroundsService,private myRoute:ActivatedRoute) { }

  FormPlayGround=new Playground();
  FormSubPlayGround = new SubPlayground();
  ownerID;
  latestPlaygroundID = 1089;
  PlayGroundObject: Playground;
  SubPlayGroundObject: SubPlayground;
  GoToSubPlayGrounds:boolean=false;
  GoToSummary:boolean=false;
  cities:Array<string>=["Alexandria","Aswan","Badr","Beni Suef","Bilbies","Cairo","Dahab","Damanhur","Damietta","Faiyum","Giza","Hurghada","Ismailia","Kafr El Sheikh","Luxor","Mansoura","Marsa Matruh","Minya","Port Said","Qena","Sharm El Sheikh","Tanta","Zagazig","6 October"]
  ngOnInit() {
    document.body.classList.add('bg-img');
    this.latestPlaygroundID = Number.parseInt(localStorage.getItem('latestPlaygroundID'));
    this.ownerID=Number.parseInt(localStorage.getItem('CurrentOwnerID'));
    // console.log(this.ownerID);
  }
  GetPlayGroundData(_playgroundName, _playgroundCountry, _playgroundCity, _playgroundStreet, _playgroundPhone1, _playgroundPhone2, _playgroundImage) {
    this.PlayGroundObject = {
      Name: _playgroundName,
      Country: _playgroundCountry,
      City: _playgroundCity,
      Street: _playgroundStreet,
      Phone1: _playgroundPhone1,
      Phone2: _playgroundPhone2,
      Image: _playgroundImage,
      PlaygroundID: 0,
      OwnerID: this.ownerID,
      Owner: null,
      Rate: 0,
      SubPlaygrounds: null
    }
    this.PostPlayground(this.PlayGroundObject);
  }
  PostPlayground(PlayGroundObject) {
    this.myServ.insertPlayground(PlayGroundObject).subscribe(
      (succ) => {
        
        // localStorage.removeItem('latestPlaygroundID');
        this.latestPlaygroundID++;
        // this.ttt++;
        localStorage.setItem('latestPlaygroundID', this.latestPlaygroundID.toString());
        this.GoToSubPlayGrounds=true;
        // console.log(this.latestPlaygroundID);
        // console.log(this.ttt);
        
      },
      (err) => { console.log(err) }
    );
  }

// sublplayground
GetSubPlayGroundData(_subplaygroundPrice, _subplaygroundType, _subplaygroundImage) {
  this.SubPlayGroundObject = {
    Price:_subplaygroundPrice,
    Type:_subplaygroundType,
    Image:_subplaygroundImage,
    PlaygroundID:Number.parseInt(localStorage.getItem('latestPlaygroundID')),
    Playground:null,
    Rate:0,
    Reservation:null,
    Reviews:null,
    SubPlaygroundID:0,
  }
  this.PostSubPlayground(this.SubPlayGroundObject);
  // console.log(this.SubPlayGroundObject);
}

PostSubPlayground(SubPlaygroundObject){
  this.myServ2.PostSubPlayground(SubPlaygroundObject).subscribe(
    (succ)=>{
     
    },
    (err)=>{ this.GoToSubPlayGrounds=false;
      this.GoToSummary=true;}
  );
}

}


