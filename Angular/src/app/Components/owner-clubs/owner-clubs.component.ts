import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from '../../Services/playground.service';
import { Playground } from '../../Models/Playground';
import { SubplaygroundsService } from '../../Services/subplaygrounds.service';
import { SubPlayground } from '../../Models/SubPlayground';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-owner-clubs',
  templateUrl: './owner-clubs.component.html',
  styleUrls: ['./owner-clubs.component.css']
})
export class OwnerClubsComponent implements OnInit {

  constructor(private myServ: PlaygroundService, private myServ2: SubplaygroundsService, private route: ActivatedRoute, private myRouter: Router) { }
  AllPlayGrounds: Playground[];
  SubPlaygroundsObject: SubPlayground[];
  CurrentModalPlayground: Playground = new Playground();
  CurrentModalSubPlayground: SubPlayground = new SubPlayground();
  cities: string[] = ["Alexandria", "Aswan", "Badr", "Beni Suef", "Bilbies", "Cairo", "Dahab", "Damanhur", "Damietta", "Faiyum", "Giza", "Hurghada", "Ismailia", "Kafr El Sheikh", "Luxor", "Mansoura", "Marsa Matruh", "Minya", "Port Said", "Qena", "Sharm El Sheikh", "Tanta", "Zagazig", "6 October"];
  ownerId;
  ngOnInit() {
    document.body.classList.add('bg-img');
    this.ownerId = Number.parseInt(localStorage.getItem('CurrentOwnerID'));
    this.getPlaygroundsbyowner(this.ownerId);
  }
  GetPlaygrounds() {
    this.myServ.getPlaygrounds().subscribe(
      (PlaygroundsData) => { this.AllPlayGrounds = PlaygroundsData },
      (err) => { console.log('no') }
    );
  }

  getPlaygroundsbyowner(id) {
    this.myServ.getPlaygroundsbyowner(id).subscribe(
      (PlaygroundsData) => { this.AllPlayGrounds = PlaygroundsData },
      (err) => { console.log('no') }
    );
  }

  DeletePlayground(id) {
    var confirmDelete = confirm("Are you sure Deleting this Club?");
    if (confirmDelete == true) {
      this.myServ.deletePlayground(id).subscribe(
        (succ) => {this.getPlaygroundsbyowner(this.ownerId);},
        (err) => { console.log(err) }
      )
    }
  }

  GetSubPlaygroundByPlayGroundID(id) {
    this.myServ2.GetSubPlaygroundByPlayGroundID(id).subscribe(
      (SubPlaygroundData) => { this.SubPlaygroundsObject = SubPlaygroundData },
      (err) => { console.log('no') }
    );
  }

  DeleteSubPlayground(id) {
    var confirmDelete = confirm("Are you sure Deleting this sub Playground?");
    if (confirmDelete == true) {
      this.myServ2.DeleteSubPlayground(id).subscribe(
        (succ) => { console.log("done") },
        (err) => { console.log(err) }
      )
      window.location.reload();
    }
  }

  goToAddSub(PlaygroundID) {
    localStorage.setItem('AddSubToPlaygroundID', PlaygroundID);
    this.myRouter.navigate(['/owner/clubs/addSub']);
  }

  GetPlaygroundByID(ID: number) {
    this.myServ.searchPlaygroundsbyid(ID).subscribe(data => {
      this.CurrentModalPlayground = data;
    });
  }

  GetSubPlayground(ID:number){
    this.myServ2.GetSubPlayground(ID).subscribe(data=>{this.CurrentModalSubPlayground=data});
  }
  //----------------------- Update PlayGround -----------------------
  PlayGroundObject; //for edit purpose

  GetPlayGroundData(_PlaygroundID,_playgroundName, _playgroundCity, _playgroundStreet, _playgroundPhone1, _playgroundPhone2) {
    this.PlayGroundObject = {
      Name: _playgroundName,
      Country: "Egypt",
      City: _playgroundCity,
      Street: _playgroundStreet,
      Phone1: _playgroundPhone1,
      Phone2: _playgroundPhone2,
      Image: null,
      PlaygroundID: _PlaygroundID,
      OwnerID: localStorage.getItem('CurrentOwnerID'),
      Owner: null,
      Rate: this.CurrentModalPlayground.Rate,
      SubPlaygrounds: null
    }
    this.updatePlayground(this.PlayGroundObject);
    // console.log(this.PlayGroundObject);
  }
  updatePlayground(PlayGroundObject) {
    this.myServ.updatePlayground(PlayGroundObject).subscribe(
      succ => {
        // console.log("success");
        this.getPlaygroundsbyowner(this.ownerId);
        $( "#closeEdit" ).trigger( "click" );
        // window.location.reload()
      }

    )
  }

  //----------------------- Update SubPlayGround -----------------------
  SubPlayGroundObject; //for edit purpose

  GetSubPlayGroundData(_subplaygroundID,_subplaygroundPrice,_subplaygroundType) {
    this.SubPlayGroundObject = {
      Price:_subplaygroundPrice,
      Type:_subplaygroundType,
      Image:this.CurrentModalSubPlayground.Image,
      PlaygroundID:this.CurrentModalSubPlayground.PlaygroundID,
      Playground:this.CurrentModalSubPlayground.Playground,
      Rate:this.CurrentModalSubPlayground.Rate,
      Reservation:this.CurrentModalSubPlayground.Reservation,
      Reviews:this.CurrentModalSubPlayground.Reviews,
      SubPlaygroundID:_subplaygroundID,
    }
    this.updateSubPlayground(this.SubPlayGroundObject.SubPlaygroundID,this.SubPlayGroundObject);
    // console.log(this.SubPlayGroundObject);
  }
  updateSubPlayground(id,SubPlayGroundObject) {
    this.myServ2.PutSubPlayground(id,SubPlayGroundObject).subscribe(
      succ => {
        // console.log("success");
        this.GetSubPlaygroundByPlayGroundID(SubPlayGroundObject.PlaygroundID);
        $("#closeEditSub").trigger( "click" );
        // window.location.reload()
      }

    )
  }

  // reserve playground------------------------------------------
  ReserveSubPlayground(id){
    localStorage.setItem('dummyUser','1024');
    localStorage.setItem('subToReserve',id);
    window.location.assign('client/reserve')
    // console.log(localStorage.getItem('subToReserve'))
  }
}
